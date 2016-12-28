drop table IF Exists absen_ijin;
CREATE TABLE `absen_ijin` (
  `no_ijin` varchar(20) DEFAULT NULL,
  `tgl_ijin` date DEFAULT NULL,
  `hari_ijin` varchar(20) DEFAULT NULL,
  `jam_ijin_awal` time DEFAULT NULL,
  `jam_ijin_akhir` time DEFAULT NULL,
  `nik` varchar(10) DEFAULT NULL,
  `kategori_ijin` varchar(10) DEFAULT NULL,
  `tipe_ijin` varchar(4) DEFAULT NULL,
  `keterangan` varchar(50) DEFAULT NULL,
  `jadwal` varchar(10) DEFAULT NULL,
  `jam_kerja_1` time DEFAULT NULL,
  `jam_kerja_2` time DEFAULT NULL,
  `jam_kerja_3` time DEFAULT NULL,
  `jam_kerja_4` time DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table IF Exists rumus_insentifhadir;
CREATE TABLE `rumus_insentifhadir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategori_ijin` varchar(10) DEFAULT NULL,
  `tipe_ijin` varchar(4) DEFAULT NULL,
  `jenisharikerja` int(2) DEFAULT NULL,
  `kali_ijin` int(11) DEFAULT '0',
  `nilai_insentif` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_kategori_ijin_rmsinsentif` (`kategori_ijin`),
  KEY `idx_tipe_ijin_rmsinsentif` (`tipe_ijin`),
  KEY `idx_kali_ijin_rmsinsentif` (`kali_ijin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ketentuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `toleransi` int(11) DEFAULT '0',
  `kuotacuti` int(11) DEFAULT '0',
  `periodemulai` int(11) DEFAULT '0',
  `periodeselesai` int(11) DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ketentuan_pantangan` (
  `hari` varchar(20) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`hari`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `harilibur_pantangan` (
  `tanggal` date NOT NULL,
  `keterangan` varchar(45) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`tanggal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ref_jenisharikerja` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

insert into ref_jenisharikerja( name) VALUES
( 'BIASA'), 
( 'PANTANGAN'), 
( 'BIASA/PANTANGAN');

DROP FUNCTION IF EXISTS gaji_db.get_nama_jenisharikerja;
CREATE FUNCTION gaji_db.`get_nama_jenisharikerja`(vid int(2)) RETURNS varchar(20) CHARSET latin1
BEGIN
	declare retval varchar(20);
  set retval=null;
  
    if exists(select * from ref_jenisharikerja where id=vid) then
      select name into retval from ref_jenisharikerja where id=vid;
    end if;
  
  
	RETURN retval;
END;


drop view if exists v_ijin;
CREATE VIEW `v_ijin` AS select `absen_ijin`.`no_ijin` AS `no_ijin`,`absen_ijin`.`tgl_ijin` AS `tgl_ijin`,`absen_ijin`.`hari_ijin` AS `hari_ijin`,`absen_ijin`.`jam_ijin_awal` AS `jam_ijin_awal`,`absen_ijin`.`jam_ijin_akhir` AS `jam_ijin_akhir`,`absen_ijin`.`nik` AS `nik`,`get_namajab_pegawai`('nama',`absen_ijin`.`nik`) AS `nama`,`get_namajab_pegawai`('jabatan',`absen_ijin`.`nik`) AS `jabatan`,`absen_ijin`.`kategori_ijin` AS `kategori_ijin`,`absen_ijin`.`tipe_ijin` AS `tipe_ijin`,`absen_ijin`.`keterangan` AS `keterangan`,`absen_ijin`.`jadwal` AS `jadwal`,`absen_ijin`.`jam_kerja_1` AS `jam_kerja_1`,`absen_ijin`.`jam_kerja_2` AS `jam_kerja_2`,`absen_ijin`.`jam_kerja_3` AS `jam_kerja_3`,`absen_ijin`.`jam_kerja_4` AS `jam_kerja_4`,`absen_ijin`.`create_date` AS `create_date`,`absen_ijin`.`create_by` AS `create_by` from `absen_ijin`;
drop view if exists v_rumus_insentifhadir;
CREATE VIEW `v_rumus_insentifhadir` AS select `a`.`id` AS `id`,`a`.`kategori_ijin` AS `kategori_ijin`,`b`.`keterangan` AS `keterangan`,`a`.`tipe_ijin` AS `tipe_ijin`,if((`a`.`tipe_ijin` = '1'),'1 Hari',if((`a`.`tipe_ijin` = '0.5'),'1/2 Hari',NULL)) AS `keterangan_tipe`,`a`.`jenisharikerja` AS `jenisharikerja`,`get_nama_jenisharikerja`(`a`.`jenisharikerja`) AS `harikerja`,`a`.`kali_ijin` AS `kali_ijin`,`a`.`nilai_insentif` AS `nilai_insentif` from (`rumus_insentifhadir` `a` join `mst_kategori_absens` `b` on((`a`.`kategori_ijin` = `b`.`kode`)));


DROP PROCEDURE IF EXISTS gaji_db.sp_ijin;
CREATE PROCEDURE gaji_db.`sp_ijin`(opt varchar(20),
vno_ijin	varchar(20)	,
vtgl_ijin	date	,
vhari_ijin	varchar(20)	,
vjam_ijin_awal	time	,
vjam_ijin_akhir	time	,
vnik	varchar(10)	,
vkategori_ijin	varchar(10)	,
vtipe_ijin	varchar(4)	,
vketerangan	varchar(50)	,
vjadwal	varchar(10)	,
vjam_kerja_1	time	,
vjam_kerja_2	time	,
vjam_kerja_3	time	,
vjam_kerja_4	time	,
vcreate_date	datetime	,
vcreate_by	varchar(20)	

)
BEGIN
  case opt
    when  'insert' then
      IF EXISTS (SELECT * FROM absen_ijin WHERE no_ijin = vno_ijin)
      THEN
        select false success, msgvalue message FROM message where id=4;
      ELSE
        INSERT INTO absen_ijin
      (no_ijin, tgl_ijin, hari_ijin, jam_ijin_awal, jam_ijin_akhir, nik, kategori_ijin, tipe_ijin, keterangan, jadwal, jam_kerja_1, jam_kerja_2, jam_kerja_3, jam_kerja_4, create_date, create_by) 
      VALUES (vno_ijin,	vtgl_ijin,	vhari_ijin,	vjam_ijin_awal,	vjam_ijin_akhir,	vnik,	vkategori_ijin,	vtipe_ijin,	vketerangan,	vjadwal,	vjam_kerja_1,	vjam_kerja_2,	vjam_kerja_3,	vjam_kerja_4,	vcreate_date,	vcreate_by);

        
        IF row_count() > 0
        THEN
          select true success, msgvalue message FROM message where id=1;
        ELSE
          select false success, msgvalue message FROM message where id=2;
        END IF;
      END IF;
    when  'update' then
      IF EXISTS (SELECT * FROM absen_ijin WHERE no_ijin = vno_ijin )
            THEN
               UPDATE absen_ijin 
                SET 
                    tgl_ijin=vtgl_ijin,
                    hari_ijin=vhari_ijin,
                    jam_ijin_awal=vjam_ijin_awal,
                    jam_ijin_akhir=vjam_ijin_akhir,
                    nik=vnik,
                    kategori_ijin=vkategori_ijin,
                    tipe_ijin=vtipe_ijin,
                    keterangan=vketerangan,
                    jadwal=vjadwal,
                    jam_kerja_1=vjam_kerja_1,
                    jam_kerja_2=vjam_kerja_2,
                    jam_kerja_3=vjam_kerja_3,
                    jam_kerja_4=vjam_kerja_4,
                    create_date=vcreate_date,
                    create_by=vcreate_by
                WHERE no_ijin=vno_ijin;


               IF row_count() > 0
               THEN
                  select true success, msgvalue message FROM message where id=1;
               ELSE
                  select false success, msgvalue message FROM message where id=2;
               END IF;
            ELSE
               select false success, msgvalue message FROM message where id=3;
            END IF;
    when  'delete' then
      IF EXISTS (SELECT * FROM absen_ijin WHERE no_ijin = vno_ijin )
            THEN
            delete from absen_ijin WHERE no_ijin = vno_ijin  ;
            IF row_count() > 0
               THEN
                  select true success, msgvalue message FROM message where id=1;
               ELSE
                  select false success, msgvalue message FROM message where id=2;
               END IF;
      ELSE
               select false success, msgvalue message FROM message where id=3;
      END IF;
  end case;
END;



DROP PROCEDURE IF EXISTS gaji_db.sp_rumus_insentifhadir;
CREATE PROCEDURE gaji_db.`sp_rumus_insentifhadir`(opt varchar(20),
vid	int(11)	,
vkategori_ijin	varchar(10)	,
vtipe_ijin	varchar(4)	,
vjenisharikerja	int(2)	,
vkali_ijin	int(11)	,
vnilai_insentif	decimal(18,2)	
)
BEGIN
  case opt
    when  'insert' then
      IF EXISTS (SELECT * FROM rumus_insentifhadir WHERE kategori_ijin = vkategori_ijin 
      and tipe_ijin= vtipe_ijin and jenisharikerja=vjenisharikerja and kali_ijin=vkali_ijin)
      THEN
        select false success, msgvalue message FROM message where id=4;
      ELSE
        INSERT INTO rumus_insentifhadir(kategori_ijin, tipe_ijin,jenisharikerja,kali_ijin,nilai_insentif )
        VALUES (vkategori_ijin, vtipe_ijin,vjenisharikerja,vkali_ijin,vnilai_insentif);
        
        IF row_count() > 0
        THEN
          select true success, msgvalue message FROM message where id=1;
        ELSE
          select false success, msgvalue message FROM message where id=2;
        END IF;
      END IF;
    when  'update' then
      IF EXISTS (SELECT * FROM rumus_insentifhadir WHERE id = vid )
            THEN
               update rumus_insentifhadir
               set kategori_ijin = vkategori_ijin ,
                   tipe_ijin= vtipe_ijin , 
                   jenisharikerja=vjenisharikerja , 
                   kali_ijin=vkali_ijin,
                   nilai_insentif=vnilai_insentif
               where id = vid;

               IF row_count() > 0
               THEN
                  select true success, msgvalue message FROM message where id=1;
               ELSE
                  select false success, msgvalue message FROM message where id=2;
               END IF;
            ELSE
               select false success, msgvalue message FROM message where id=3;
            END IF;
    when  'delete' then
      IF EXISTS (SELECT * FROM rumus_insentifhadir WHERE id = vid )
            THEN
            delete from rumus_insentifhadir WHERE id = vid ;
            IF row_count() > 0
               THEN
                  select true success, msgvalue message FROM message where id=1;
               ELSE
                  select false success, msgvalue message FROM message where id=2;
               END IF;
      ELSE
               select false success, msgvalue message FROM message where id=3;
      END IF;
  end case;
END;


DROP PROCEDURE IF EXISTS gaji_db.sp_ketentuanpantangan;
CREATE PROCEDURE gaji_db.`sp_ketentuanpantangan`(opt varchar(20),vhari varchar(20))
BEGIN
	case opt
    when 'clear' then
      truncate table ketentuan_pantangan;
    when 'insert' then
      insert into ketentuan_pantangan(hari) values(vhari);
      IF row_count() > 0 THEN
          select true success, msgvalue message FROM message where id=1;
      ELSE
          select false success, msgvalue message FROM message where id=2;
      END IF;
    when 'delete' then
      if exists(select * from ketentuan_pantangan where hari=vhari) then
            delete from ketentuan_pantangan where hari=vhari;
            IF row_count() > 0 THEN
                select true success, msgvalue message FROM message where id=1;
            ELSE
                select false success, msgvalue message FROM message where id=2;
            END IF;
          else
            select false success, msgvalue message FROM message where id=3;
          end if;
  end case;
    
    
END;
