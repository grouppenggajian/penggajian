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
class Shift extends MYModel{
    //put your code here
    protected $fillable = [
        'kode',
        'keterangan',
        'jam_kerja_1',
        'jam_kerja_2',
        'jam_kerja_3',
        'jam_kerja_4'
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
