<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $post_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @property-read \App\Models\Post $post
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bookmark whereUserId($value)
 */
	class Bookmark extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property string $referral_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator whereReferralCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collaborator whereUserId($value)
 */
	class Collaborator extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $code
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Color whereUpdatedAt($value)
 */
	class Color extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Post> $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Floor whereUpdatedAt($value)
 */
	class Floor extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $app_name
 * @property string $contact_email
 * @property string $contact_number
 * @property string|null $app_main_logo_dark
 * @property string|null $app_main_logo_light
 * @property string|null $app_favicon
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $app_favicon_url
 * @property-read mixed $app_main_logo_dark_url
 * @property-read mixed $app_main_logo_light_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppFavicon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppMainLogoDark($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppMainLogoLight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereContactEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereContactNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereUpdatedAt($value)
 */
	class GeneralSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $user_id
 * @property int|null $floor_id
 * @property string $title
 * @property string $content
 * @property array<array-key, mixed>|null $images
 * @property array<array-key, mixed>|null $videos
 * @property string|null $slug
 * @property string|null $tag
 * @property string|null $latitude
 * @property string|null $longitude
 * @property string|null $location_name
 * @property string $post_type
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $bookmarkedByUsers
 * @property-read int|null $bookmarked_by_users_count
 * @property-read \App\Models\Floor|null $floor
 * @property-read mixed $added_at
 * @property-read mixed $created_at_time
 * @property-read mixed $is_bookmarked
 * @property-read mixed $post_image_urls
 * @property-read mixed $post_video_urls
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereFloorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereLocationName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post wherePostType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Post whereVideos($value)
 */
	class Post extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role withoutPermission($permissions)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $model_name
 * @property string $capacity
 * @property array<array-key, mixed> $color_ids
 * @property string $condition
 * @property string $barcode
 * @property string $selling_price
 * @property string $status
 * @property array<array-key, mixed>|null $images
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @property-read mixed $colors
 * @property-read mixed $smartphone_image_urls
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereBarcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereColorIds($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereCondition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereModelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereSellingPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Smartphone whereUpdatedAt($value)
 */
	class Smartphone extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $smtp_mailer
 * @property string $smtp_scheme
 * @property string $smtp_host
 * @property string $smtp_port
 * @property string $smtp_username
 * @property string $smtp_password
 * @property string $smtp_mail_from_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpMailFromAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpMailer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpPort($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpScheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereUpdatedAt($value)
 */
	class SmtpSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $company_name
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $added_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereUserId($value)
 */
	class Supplier extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property int $is_active
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Post> $bookMarkedPosts
 * @property-read int|null $book_marked_posts_count
 * @property-read \App\Models\Collaborator|null $collaborator
 * @property-read mixed $added_at
 * @property-read mixed $avatar
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Post> $posts
 * @property-read int|null $posts_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \App\Models\Supplier|null $supplier
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 */
	class User extends \Eloquent {}
}

