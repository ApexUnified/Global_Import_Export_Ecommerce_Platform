<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {

        // Permission::get()->map(function ($permission) {
        //     $permission->delete();
        // });

        if (Permission::doesntExist()) {

            $permissions = [
                [

                    'name' => 'Posts View',
                    'guard_name' => 'web',
                    'parent_name' => 'Posts',
                    'icon' => 'PencilSquareIcon',
                    'created_at' => '2025-09-04 08:06:31',
                    'updated_at' => '2025-09-04 08:06:51',
                ],
                [

                    'name' => 'Posts Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Posts',
                    'icon' => 'PencilSquareIcon',
                    'created_at' => '2025-09-04 08:07:09',
                    'updated_at' => '2025-09-04 08:07:09',
                ],
                [

                    'name' => 'Posts Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Posts',
                    'icon' => 'PencilSquareIcon',
                    'created_at' => '2025-09-04 08:07:20',
                    'updated_at' => '2025-09-04 08:07:20',
                ],
                [

                    'name' => 'Posts Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Posts',
                    'icon' => 'PencilSquareIcon',
                    'created_at' => '2025-09-04 08:07:35',
                    'updated_at' => '2025-09-04 08:07:35',
                ],
                [

                    'name' => 'Floors View',
                    'guard_name' => 'web',
                    'parent_name' => 'Floors',
                    'icon' => 'BuildingOffice2Icon',
                    'created_at' => '2025-09-04 08:08:17',
                    'updated_at' => '2025-09-04 08:08:17',
                ],
                [
                    'name' => 'Floors Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Floors',
                    'icon' => 'BuildingOffice2Icon',
                    'created_at' => '2025-09-04 08:08:34',
                    'updated_at' => '2025-09-04 08:08:34',
                ],
                [

                    'name' => 'Floors Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Floors',
                    'icon' => 'BuildingOffice2Icon',
                    'created_at' => '2025-09-04 08:08:42',
                    'updated_at' => '2025-09-04 08:08:42',
                ],
                [

                    'name' => 'Floors Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Floors',
                    'icon' => 'BuildingOffice2Icon',
                    'created_at' => '2025-09-04 08:08:51',
                    'updated_at' => '2025-09-04 08:08:51',
                ],
                [

                    'name' => 'Bookmarks View',
                    'guard_name' => 'web',
                    'parent_name' => 'Bookmarks',
                    'icon' => 'BookmarkIcon',
                    'created_at' => '2025-09-04 08:09:40',
                    'updated_at' => '2025-09-04 08:09:40',
                ],
                [

                    'name' => 'Bookmarks Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Bookmarks',
                    'icon' => 'BookmarkIcon',
                    'created_at' => '2025-09-04 08:09:58',
                    'updated_at' => '2025-09-04 08:09:58',
                ],
                [

                    'name' => 'Users View',
                    'guard_name' => 'web',
                    'parent_name' => 'Users',
                    'icon' => 'UsersIcon',
                    'created_at' => '2025-09-04 08:11:05',
                    'updated_at' => '2025-09-04 08:11:05',
                ],
                [

                    'name' => 'Users Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Users',
                    'icon' => 'UsersIcon',
                    'created_at' => '2025-09-04 08:11:19',
                    'updated_at' => '2025-09-04 08:11:19',
                ],
                [

                    'name' => 'Users Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Users',
                    'icon' => 'UsersIcon',
                    'created_at' => '2025-09-04 08:11:28',
                    'updated_at' => '2025-09-04 08:11:28',
                ],
                [

                    'name' => 'Users Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Users',
                    'icon' => 'UsersIcon',
                    'created_at' => '2025-09-04 08:11:37',
                    'updated_at' => '2025-09-04 08:11:37',
                ],
                [

                    'name' => 'Suppliers View',
                    'guard_name' => 'web',
                    'parent_name' => 'Suppliers',
                    'icon' => 'TruckIcon',
                    'created_at' => '2025-09-04 08:12:15',
                    'updated_at' => '2025-09-04 08:12:15',
                ],
                [

                    'name' => 'Suppliers Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Suppliers',
                    'icon' => 'TruckIcon',
                    'created_at' => '2025-09-04 08:12:24',
                    'updated_at' => '2025-09-04 08:12:24',
                ],
                [
                    'name' => 'Suppliers Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Suppliers',
                    'icon' => 'TruckIcon',
                    'created_at' => '2025-09-04 08:12:36',
                    'updated_at' => '2025-09-04 08:12:36',
                ],
                [

                    'name' => 'Suppliers Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Suppliers',
                    'icon' => 'TruckIcon',
                    'created_at' => '2025-09-04 08:12:47',
                    'updated_at' => '2025-09-04 08:12:47',
                ],
                [

                    'name' => 'Collaborators View',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborators',
                    'icon' => 'BriefcaseIcon',
                    'created_at' => '2025-09-04 08:17:00',
                    'updated_at' => '2025-09-04 08:17:00',
                ],
                [

                    'name' => 'Collaborators Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborators',
                    'icon' => 'BriefcaseIcon',
                    'created_at' => '2025-09-04 08:17:15',
                    'updated_at' => '2025-09-04 08:17:15',
                ],
                [

                    'name' => 'Collaborators Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborators',
                    'icon' => 'BriefcaseIcon',
                    'created_at' => '2025-09-04 08:17:28',
                    'updated_at' => '2025-09-04 08:17:28',
                ],
                [

                    'name' => 'Collaborators Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborators',
                    'icon' => 'BriefcaseIcon',
                    'created_at' => '2025-09-04 08:17:40',
                    'updated_at' => '2025-09-04 08:17:40',
                ],
                [

                    'name' => 'Distributors View',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributors',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:18:32',
                    'updated_at' => '2025-09-04 08:18:32',
                ],
                [

                    'name' => 'Distributors Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributors',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:18:46',
                    'updated_at' => '2025-09-04 08:18:46',
                ],
                [

                    'name' => 'Distributors Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributors',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:18:56',
                    'updated_at' => '2025-09-04 08:18:56',
                ],
                [

                    'name' => 'Distributors Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributors',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:19:07',
                    'updated_at' => '2025-09-04 08:19:07',
                ],
                [

                    'name' => 'Customers View',
                    'guard_name' => 'web',
                    'parent_name' => 'Customers',
                    'icon' => 'UserGroupIcon',
                    'created_at' => '2025-09-04 08:19:32',
                    'updated_at' => '2025-09-04 08:19:58',
                ],
                [

                    'name' => 'Customers Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Customers',
                    'icon' => 'UserGroupIcon',
                    'created_at' => '2025-09-04 08:20:11',
                    'updated_at' => '2025-09-04 08:20:11',
                ],
                [

                    'name' => 'Customers Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Customers',
                    'icon' => 'UserGroupIcon',
                    'created_at' => '2025-09-04 08:20:20',
                    'updated_at' => '2025-09-04 08:20:20',
                ],
                [

                    'name' => 'Customers Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Customers',
                    'icon' => 'UserGroupIcon',
                    'created_at' => '2025-09-04 08:20:37',
                    'updated_at' => '2025-09-04 08:20:37',
                ],
                [

                    'name' => 'Categories View',
                    'guard_name' => 'web',
                    'parent_name' => 'Categories',
                    'icon' => 'TagIcon',
                    'created_at' => '2025-09-04 08:21:09',
                    'updated_at' => '2025-09-04 08:21:09',
                ],
                [

                    'name' => 'Categories Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Categories',
                    'icon' => 'TagIcon',
                    'created_at' => '2025-09-04 08:21:18',
                    'updated_at' => '2025-09-04 08:21:18',
                ],
                [

                    'name' => 'Categories Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Categories',
                    'icon' => 'TagIcon',
                    'created_at' => '2025-09-04 08:21:26',
                    'updated_at' => '2025-09-04 08:21:26',
                ],
                [

                    'name' => 'Categories Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Categories',
                    'icon' => 'TagIcon',
                    'created_at' => '2025-09-04 08:21:34',
                    'updated_at' => '2025-09-04 08:21:34',
                ],
                [

                    'name' => 'Smartphones View',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphones',
                    'icon' => 'DevicePhoneMobileIcon',
                    'created_at' => '2025-09-04 08:21:57',
                    'updated_at' => '2025-09-04 08:21:57',
                ],
                [

                    'name' => 'Smartphones Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphones',
                    'icon' => 'DevicePhoneMobileIcon',
                    'created_at' => '2025-09-04 08:22:10',
                    'updated_at' => '2025-09-04 08:22:10',
                ],
                [

                    'name' => 'Smartphones Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphones',
                    'icon' => 'DevicePhoneMobileIcon',
                    'created_at' => '2025-09-04 08:22:18',
                    'updated_at' => '2025-09-04 08:22:18',
                ],
                [

                    'name' => 'Smartphones Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphones',
                    'icon' => 'DevicePhoneMobileIcon',
                    'created_at' => '2025-09-04 08:22:25',
                    'updated_at' => '2025-09-04 08:22:30',
                ],
                [

                    'name' => 'Batches View',
                    'guard_name' => 'web',
                    'parent_name' => 'Batches',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:24:52',
                    'updated_at' => '2025-09-04 08:24:52',
                ],
                [

                    'name' => 'Batches Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Batches',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:25:03',
                    'updated_at' => '2025-09-04 08:25:03',
                ],
                [

                    'name' => 'Batches Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Batches',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:25:14',
                    'updated_at' => '2025-09-04 08:25:14',
                ],
                [

                    'name' => 'Batches Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Batches',
                    'icon' => 'ArchiveBoxIcon',
                    'created_at' => '2025-09-04 08:25:25',
                    'updated_at' => '2025-09-04 08:25:25',
                ],
                [

                    'name' => 'Inventories View',
                    'guard_name' => 'web',
                    'parent_name' => 'Inventories',
                    'icon' => 'CircleStackIcon',
                    'created_at' => '2025-09-04 08:52:33',
                    'updated_at' => '2025-09-04 08:52:33',
                ],
                [

                    'name' => 'Inventories Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Inventories',
                    'icon' => 'CircleStackIcon',
                    'created_at' => '2025-09-04 08:52:56',
                    'updated_at' => '2025-09-04 08:52:56',
                ],
                [

                    'name' => 'Inventories Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Inventories',
                    'icon' => 'CircleStackIcon',
                    'created_at' => '2025-09-04 08:53:16',
                    'updated_at' => '2025-09-04 08:53:16',
                ],
                [

                    'name' => 'Orders View',
                    'guard_name' => 'web',
                    'parent_name' => 'Orders',
                    'icon' => 'ShoppingCartIcon',
                    'created_at' => '2025-09-04 08:55:33',
                    'updated_at' => '2025-09-04 08:55:33',
                ],
                [

                    'name' => 'Orders Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Orders',
                    'icon' => 'ShoppingCartIcon',
                    'created_at' => '2025-09-04 08:55:44',
                    'updated_at' => '2025-09-04 08:55:44',
                ],
                [

                    'name' => 'Orders Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Orders',
                    'icon' => 'ShoppingCartIcon',
                    'created_at' => '2025-09-04 08:55:53',
                    'updated_at' => '2025-09-04 08:55:53',
                ],
                [

                    'name' => 'Orders Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Orders',
                    'icon' => 'ShoppingCartIcon',
                    'created_at' => '2025-09-04 08:56:02',
                    'updated_at' => '2025-09-04 08:56:02',
                ],
                [

                    'name' => 'Package Recordings View',
                    'guard_name' => 'web',
                    'parent_name' => 'Package Recordings',
                    'icon' => 'VideoCameraIcon',
                    'created_at' => '2025-09-04 08:55:10',
                    'updated_at' => '2025-09-04 08:55:10',
                ],

                [

                    'name' => 'Package Recordings Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Package Recordings',
                    'icon' => 'VideoCameraIcon',
                    'created_at' => '2025-09-04 08:55:15',
                    'updated_at' => '2025-09-04 08:55:15',
                ],
                [
                    'name' => 'Package Recordings Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Package Recordings',
                    'icon' => 'VideoCameraIcon',
                    'created_at' => '2025-09-04 08:56:44',
                    'updated_at' => '2025-09-04 08:56:44',
                ],
                [

                    'name' => 'Smartphone For Sales View',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphone For Sales',
                    'icon' => 'ChartBarIcon',
                    'created_at' => '2025-09-04 08:57:26',
                    'updated_at' => '2025-09-04 08:57:26',
                ],
                [

                    'name' => 'Smartphone For Sales Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphone For Sales',
                    'icon' => 'ChartBarIcon',
                    'created_at' => '2025-09-04 08:57:43',
                    'updated_at' => '2025-09-04 08:57:43',
                ],
                [

                    'name' => 'Smartphone For Sales Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphone For Sales',
                    'icon' => 'ChartBarIcon',
                    'created_at' => '2025-09-04 08:57:54',
                    'updated_at' => '2025-09-04 08:57:54',
                ],
                [

                    'name' => 'Smartphone For Sales Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Smartphone For Sales',
                    'icon' => 'ChartBarIcon',
                    'created_at' => '2025-09-04 08:58:03',
                    'updated_at' => '2025-09-04 08:58:03',
                ],
                [

                    'name' => 'Reward Points View',
                    'guard_name' => 'web',
                    'parent_name' => 'Reward Points',
                    'icon' => 'GiftIcon',
                    'created_at' => '2025-09-04 08:58:32',
                    'updated_at' => '2025-09-04 08:58:32',
                ],
                [

                    'name' => 'Reward Points Create',
                    'guard_name' => 'web',
                    'parent_name' => 'Reward Points',
                    'icon' => 'GiftIcon',
                    'created_at' => '2025-09-04 08:58:41',
                    'updated_at' => '2025-09-04 08:58:41',
                ],
                [

                    'name' => 'Reward Points Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Reward Points',
                    'icon' => 'GiftIcon',
                    'created_at' => '2025-09-04 08:58:53',
                    'updated_at' => '2025-09-04 08:58:53',
                ],
                [

                    'name' => 'Reward Points Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Reward Points',
                    'icon' => 'GiftIcon',
                    'created_at' => '2025-09-04 08:59:02',
                    'updated_at' => '2025-09-04 08:59:02',
                ],
                [

                    'name' => 'Supplier Commissions View',
                    'guard_name' => 'web',
                    'parent_name' => 'Supplier Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-04 08:59:34',
                    'updated_at' => '2025-09-05 00:53:53',
                ],

                [

                    'name' => 'Supplier Commissions Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Supplier Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:50:11',
                    'updated_at' => '2025-09-05 00:53:40',
                ],
                [

                    'name' => 'Supplier Commissions Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Supplier Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:50:22',
                    'updated_at' => '2025-09-05 00:53:34',
                ],
                [

                    'name' => 'Collaborator Commissions View',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborator Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:51:30',
                    'updated_at' => '2025-09-05 00:53:26',
                ],

                [

                    'name' => 'Collaborator Commissions Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborator Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:52:11',
                    'updated_at' => '2025-09-05 00:53:17',
                ],
                [
                    'name' => 'Collaborator Commissions Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Collaborator Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:52:22',
                    'updated_at' => '2025-09-05 00:53:12',
                ],
                [

                    'name' => 'Distributor Commissions View',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributor Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:54:23',
                    'updated_at' => '2025-09-05 00:54:23',
                ],

                [

                    'name' => 'Distributor Commissions Edit',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributor Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:54:41',
                    'updated_at' => '2025-09-05 00:54:41',
                ],
                [
                    'name' => 'Distributor Commissions Delete',
                    'guard_name' => 'web',
                    'parent_name' => 'Distributor Commissions',
                    'icon' => 'BanknotesIcon',
                    'created_at' => '2025-09-05 00:54:50',
                    'updated_at' => '2025-09-05 00:54:50',
                ],
                [

                    'name' => 'Settings View',
                    'guard_name' => 'web',
                    'parent_name' => 'Settings',
                    'icon' => 'Cog6ToothIcon',
                    'created_at' => '2025-09-05 00:55:20',
                    'updated_at' => '2025-09-05 00:55:20',
                ],
            ];

            Permission::insert($permissions);
        }
    }
}
