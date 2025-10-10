import GlobalSearch from '@/Components/GlobalSearch';
import MainLayout from '@/Layouts/Website/MainLayout';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';

import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const index = ({ results, query, google_map_api_key, post_filters, pagination }) => {
    const [defaultPostFilters, setDefaultPostFilters] = useState(post_filters || []);
    const [defaultFiltersCleared, setDefaultFiltersCleared] = useState(false);
    const [AllResults, setAllResults] = useState(results || []);

    // Fetch More Results When Scrolls Logic
    const [nextPageUrl, setNextPageUrl] = useState(pagination.next_page_url || null);

    const loaderRef = useRef(null);

    const fetchMoreResults = async () => {
        if (!nextPageUrl) return;

        try {
            const res = await axios.get(nextPageUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            const { results: newResults, pagination } = res.data;

            setAllResults((prev) => {
                const existingKeys = new Set(prev.map((item) => `${item.type}-${item.id}`));

                const filteredNew = newResults.filter(
                    (item) => !existingKeys.has(`${item.type}-${item.id}`),
                );

                return [...prev, ...filteredNew];
            });

            setNextPageUrl(pagination.next_page_url);
        } catch (err) {
            toast.error('Error fetching post ' + err);
        }
    };

    const hashtags = AllResults.filter((i) => i.matchType === 'hashtag');
    const urls = AllResults.filter((i) => i.matchType === 'url');
    const searchTerms = AllResults.filter((i) => i.matchType === 'search_terms');

    const hasHashtags = hashtags.length > 0;
    const hasUrls = urls.length > 0;
    const hasSearchTerms = searchTerms.length > 0;

    // Tab logic
    const [activeTab, setActiveTab] = useState('all');
    const tabs = [
        { key: 'all', label: 'All', count: AllResults.length },

        ...(hasHashtags
            ? [
                  {
                      key: 'hashtags',
                      label: 'HashTags',
                      count: hashtags.length,
                      icon: (
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5 text-gray-600 dark:text-white/80"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
                              />
                          </svg>
                      ),
                  },
              ]
            : []),

        ...(hasSearchTerms
            ? [
                  {
                      key: 'searchterms',
                      label: 'Search Terms',
                      count: searchTerms.length,
                      icon: (
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5 text-gray-600 dark:text-white/80"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                              />
                          </svg>
                      ),
                  },
              ]
            : []),

        ...(hasUrls
            ? [
                  {
                      key: 'urls',
                      label: "URL's",
                      count: urls.length,
                      icon: (
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-5 text-gray-600 dark:text-white/80"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                              />
                          </svg>
                      ),
                  },
              ]
            : []),
    ];

    // Filter by tab selection
    let tabResults = [];

    switch (activeTab) {
        case 'hashtags':
            tabResults = hashtags;
            break;
        case 'urls':
            tabResults = urls;
            break;
        case 'searchterms':
            tabResults = searchTerms;
            break;
        default:
            tabResults = AllResults; // all
    }

    const generateURL = (post) => {
        return (
            `?slug=${post?.slug}&planet=earth${post?.latitude != null ? '&lat=' + post?.latitude : ''}` +
            `${post?.longitude != null ? '&lng=' + post?.longitude : ''}` +
            `${post?.location_name != null ? '&location_name=' + post?.location_name : ''}` +
            `&timestamp=${post?.timestamp}` +
            `${post?.floor != null ? '&floor=' + post?.floor : ''}`
        );
    };

    const handleClearFilters = () => {
        setDefaultPostFilters({
            from_floor_id: '',
            to_floor_id: '',
            date_range: '',
            address: {
                lat: '',
                lng: '',
            },
            radius: '',
        });
        setDefaultFiltersCleared(true);
        toast.info('Filters cleared');
    };

    // Infinite Scroll Observer
    useEffect(() => {
        if (!loaderRef.current || !nextPageUrl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchMoreResults();
                }
            },
            { threshold: 1 },
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [nextPageUrl]);

    return (
        <MainLayout>
            <Head title="Result" />

            <GlobalSearch
                google_map_api_key={google_map_api_key}
                additional_filters={false}
                resultsPage={true}
                defaultQuery={query}
                defaultPostFilters={defaultPostFilters}
                defaultFiltersCleared={defaultFiltersCleared}
            />

            <div className="pb-20 sm:pb-20">
                <div className="rounded-xl bg-white px-3 text-gray-900 dark:bg-deepcharcoal dark:text-gray-100 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-slate-700">
                        <div className="relative flex items-center gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative pb-2 text-sm transition-all duration-300 ease-in-out ${
                                        activeTab === tab.key
                                            ? 'scale-105 text-indigo-600 dark:text-indigo-400'
                                            : 'text-gray-600 hover:scale-105 hover:text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        {tab.icon} {' ' + tab.label}{' '}
                                        <span
                                            className={`ml-1 text-xs ${activeTab === tab.key ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-white/80'}`}
                                        >
                                            ({tab.count})
                                        </span>
                                    </div>
                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-indigo-500 transition-all duration-300 ease-in-out ${activeTab === tab.key ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'} `}
                                    ></span>
                                </button>
                            ))}

                            {defaultPostFilters &&
                                (() => {
                                    const {
                                        address,
                                        radius,
                                        from_floor_id,
                                        to_floor_id,
                                        date_range,
                                    } = defaultPostFilters;

                                    const hasAddress = address?.lat && address?.lng;
                                    const hasRadius = radius && radius > 0;
                                    const hasFloors = from_floor_id || to_floor_id;
                                    const hasDateRange =
                                        Array.isArray(date_range) && date_range.length === 2;

                                    // Show only if there’s something to display
                                    if (!hasAddress && !hasRadius && !hasFloors && !hasDateRange)
                                        return null;

                                    return (
                                        <div
                                            className="border-gray-5 group relative mx-6 mb-3 mt-2 flex cursor-pointer items-center justify-between rounded-lg border bg-white px-6 py-2 text-sm text-gray-800 transition-all hover:bg-indigo-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-700"
                                            title="Click to modify filters"
                                        >
                                            <div className="flex flex-wrap items-center gap-x-2">
                                                {hasAddress && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                                                Address:
                                                            </span>{' '}
                                                            {address.name
                                                                ? address.name
                                                                : `(${address.lat.toFixed(4)}, ${address.lng.toFixed(4)})`}
                                                        </span>
                                                    </>
                                                )}

                                                {hasFloors && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            , within {from_floor_id || '?'}~
                                                            {to_floor_id || '?'}f
                                                        </span>
                                                    </>
                                                )}

                                                {hasRadius && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            , 0~{(radius / 1000).toFixed(1)}km
                                                        </span>
                                                    </>
                                                )}

                                                {hasDateRange && (
                                                    <>
                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            ,{' '}
                                                            {new Date(
                                                                date_range[0],
                                                            ).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: '2-digit',
                                                            })}{' '}
                                                            ~{' '}
                                                            {new Date(
                                                                date_range[1],
                                                            ).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: '2-digit',
                                                            })}
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Clear Button */}
                                            <button
                                                onClick={handleClearFilters}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-gray-200 hover:text-red-500 dark:hover:bg-slate-600"
                                                title="Clear filters"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    );
                                })()}
                        </div>
                    </div>

                    {/* Result List */}
                    <div className="divide-y divide-gray-200 dark:divide-slate-700">
                        {tabResults.length === 0 ? (
                            <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                                No results found
                            </div>
                        ) : (
                            tabResults.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/80"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title || item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-white/80">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate">{item.title || item.name}</h3>
                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                            {item.type === 'posts'
                                                ? item.location_name || ''
                                                : item.capacity || ''}
                                        </p>

                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                            {item.created_at}
                                        </p>
                                    </div>

                                    {/* Right Info */}
                                    <div className="flex flex-wrap items-center justify-center gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100 lg:flex-nowrap">
                                        <button
                                            title="Copy Link"
                                            className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                            onClick={() => {
                                                item.type === 'posts'
                                                    ? navigator.clipboard.writeText(
                                                          route('home', generateURL(item)),
                                                      )
                                                    : navigator.clipboard.writeText('Pending');
                                                toast.success('Link copied to clipboard');
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                                />
                                            </svg>
                                        </button>

                                        <a
                                            title="Open"
                                            href={
                                                item.type === 'posts'
                                                    ? route('home', generateURL(item))
                                                    : 'Pending'
                                            }
                                            target="_blank"
                                            className="flex h-8 w-full items-center justify-center gap-2 rounded-full p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                                />
                                            </svg>
                                            <span className="text-xs">New Tab</span>
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {tabResults.length > 0 && nextPageUrl && (
                        <div
                            ref={loaderRef}
                            className="flex animate-pulse items-center justify-center gap-2 py-10 text-center text-gray-700 transition-all duration-100 dark:text-white/80"
                        >
                            <div className="flex items-center justify-center">
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5 animate-spin fill-indigo-600 text-gray-200 dark:text-gray-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            Loading more...
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default index;
