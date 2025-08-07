<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'tech_stack',
        'image',
        'github_link',
        'demo_link',
        'screenshots'
    ];
    protected $casts =[
        'screenshots' => 'array',
    ];
}
