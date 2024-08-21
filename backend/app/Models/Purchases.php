<?php

namespace App\Models;


/**
 * App\Models\Purchases
 *
 * @property int $id
 * @property App\Models\User[] $user_id
 * @property string $type
 * @property float $value
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PurchasedNumbers[] $numbers
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCpf($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCnpj($value)
 * 
 * 
 * @mixin \Eloquent
 */


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchases extends Model
{
    const STATUS_RESERVADO = 0;
    const STATUS_PAGO = 1;
    const STATUS_CANCELADO = 2;

    use HasFactory;

    protected $fillable = [
        'user_id',
        'payment_method',
        'value',
        'status',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    } 

    public function purchasedNumbers()
    {
        return $this->hasMany(PurchasedNumbers::class, 'purchase_id', 'id');
    }

}
