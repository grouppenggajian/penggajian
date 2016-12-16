<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pinjaman
 *
 * @author miyzan
 */
namespace App\Models;
class Pinjaman extends MYModel{
    //put your code here
    protected $fillable = [
        'kode',
        'keterangan'
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
