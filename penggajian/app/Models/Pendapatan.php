<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pendapatan
 *
 * @author miyzan
 */
namespace App\Models;
class Pendapatan extends MYModel{
    //put your code here
    protected $fillable = [
        'kode',
        'keterangan',
        'posting'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
       
    ];
}

?>
