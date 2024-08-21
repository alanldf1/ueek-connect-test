<?php

namespace App\Models;


/**
 * App\Models\Purchases
 *
 * @property int $id
 * @property App\Models\Numbers[] $number_id
 * @property App\Models\Purchases[] int $purchase_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
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

class PurchasedNumbers extends Model
{
    use HasFactory;

    protected $fillable = [
        'number_id',
        'purchase_id',
    ];
    // Relacionamento belongsTo com Order
    public function purchase()
    {
        return $this->belongsTo(Purchases::class);
    }
}
