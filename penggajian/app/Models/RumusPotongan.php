<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RumusPotongan
 *
 * @author miyzan
 */

namespace App\Models;

class RumusPotongan extends MYModel {

    protected $fillable = [

        'id',
        'kode',
        'komponen',
        'rowset',
        'column_name'
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
