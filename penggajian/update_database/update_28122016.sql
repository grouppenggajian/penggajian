drop table if exists absen_cuti;
CREATE TABLE `absen_cuti` (
  `no_cuti` varchar(20) NOT NULL,
  `nik` varchar(10) DEFAULT NULL,
  `kategori_cuti` varchar(10) DEFAULT NULL,
  `keterangan` varchar(50) DEFAULT NULL,
  `tgl_mulai` date DEFAULT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `sisa_cuti` int(11) DEFAULT NULL,
  `jml_cuti` int(11) DEFAULT NULL,
  `sisakuota_cuti` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`no_cuti`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists tukaroff;
CREATE TABLE `tukaroff` (
  `no_tukar` varchar(20) NOT NULL,
  `kode_jabatan` varchar(20) DEFAULT NULL,
  `nik` varchar(10) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `hari` varchar(20) DEFAULT NULL,
  `kode_shift` varchar(10) DEFAULT NULL,
  `jam_kerja_1` time DEFAULT NULL,
  `jam_kerja_2` time DEFAULT NULL,
  `jam_kerja_3` time DEFAULT NULL,
  `jam_kerja_4` time DEFAULT NULL,
  `nik_tukar` varchar(10) DEFAULT NULL,
  `tanggal_tukar` date DEFAULT NULL,
  `hari_tukar` varchar(20) DEFAULT NULL,
  `kode_shift_tukar` varchar(10) DEFAULT NULL,
  `jam_kerja_1_tukar` time DEFAULT NULL,
  `jam_kerja_2_tukar` time DEFAULT NULL,
  `jam_kerja_3_tukar` time DEFAULT NULL,
  `jam_kerja_4_tukar` time DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`no_tukar`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP FUNCTION IF EXISTS get_sisa_cuti;
CREATE FUNCTION `get_sisa_cuti`(vnik varchar(20),vtgl date) RETURNS int(11)
BEGIN
	declare retval,tahun int(11);  
  select kuotacuti into retval from ketentuan;
  set tahun=year(vtgl);
  if (vtgl is not null) then
    if exists(select * from mst_karyawans where nik=vnik) then
      if exists(select * from absen_cuti where nik=vnik and year(tgl_mulai)=tahun) then
        select retval-(sum(jml_cuti)) into retval from absen_cuti where nik=vnik and year(tgl_mulai)=tahun;    
      end if;
    else
      set retval=0;
    end if;
  else
    set retval=0;
  end if;
	RETURN retval;
END;

drop view IF EXISTS v_cuti;
CREATE  VIEW `v_cuti` AS select `absen_cuti`.`no_cuti` AS `no_cuti`,`absen_cuti`.`nik` AS `nik`,`get_namajab_pegawai`('nama',`absen_cuti`.`nik`) AS `nama`,`get_namajab_pegawai`('jabatan',`absen_cuti`.`nik`) AS `jabatan`,`absen_cuti`.`kategori_cuti` AS `kategori_cuti`,`absen_cuti`.`keterangan` AS `keterangan`,`absen_cuti`.`tgl_mulai` AS `tgl_mulai`,`absen_cuti`.`tgl_selesai` AS `tgl_selesai`,`absen_cuti`.`sisa_cuti` AS `sisa_cuti`,`absen_cuti`.`jml_cuti` AS `jml_cuti`,`absen_cuti`.`sisakuota_cuti` AS `sisakuota_cuti`,`absen_cuti`.`create_date` AS `create_date`,`absen_cuti`.`create_by` AS `create_by` from `absen_cuti`;
drop view IF EXISTS v_tukaroff;
CREATE VIEW `v_tukaroff` AS select `tukaroff`.`no_tukar` AS `no_tukar`,`tukaroff`.`kode_jabatan` AS `kode_jabatan`,`get_nama_jabatan`(`tukaroff`.`kode_jabatan`) AS `nama_jabatan`,`tukaroff`.`nik` AS `nik`,`get_namajab_pegawai`('nama',`tukaroff`.`nik`) AS `nama`,`tukaroff`.`tanggal` AS `tanggal`,`tukaroff`.`hari` AS `hari`,`tukaroff`.`kode_shift` AS `kode_shift`,`tukaroff`.`jam_kerja_1` AS `jam_kerja_1`,`tukaroff`.`jam_kerja_2` AS `jam_kerja_2`,`tukaroff`.`jam_kerja_3` AS `jam_kerja_3`,`tukaroff`.`jam_kerja_4` AS `jam_kerja_4`,`tukaroff`.`nik_tukar` AS `nik_tukar`,`get_namajab_pegawai`('nama',`tukaroff`.`nik_tukar`) AS `nama_tukar`,`tukaroff`.`tanggal_tukar` AS `tanggal_tukar`,`tukaroff`.`hari_tukar` AS `hari_tukar`,`tukaroff`.`kode_shift_tukar` AS `kode_shift_tukar`,`tukaroff`.`jam_kerja_1_tukar` AS `jam_kerja_1_tukar`,`tukaroff`.`jam_kerja_2_tukar` AS `jam_kerja_2_tukar`,`tukaroff`.`jam_kerja_3_tukar` AS `jam_kerja_3_tukar`,`tukaroff`.`jam_kerja_4_tukar` AS `jam_kerja_4_tukar`,`tukaroff`.`create_date` AS `create_date`,`tukaroff`.`create_by` AS `create_by` from `tukaroff`;

DROP PROCEDURE IF EXISTS sp_cuti;
CREATE PROCEDURE `sp_cuti`(opt varchar(20),
vno_cuti	varchar(20)	,
vnik	varchar(10)	,
vkategori_cuti	varchar(10)	,
vketerangan	varchar(50)	,
vtgl_mulai	date	,
vtgl_selesai	date	,
vsisa_cuti	int(11)	,
vjml_cuti	int(11)	,
vsisakuota_cuti	int(11)	,
vcreate_date	datetime	,
vcreate_by	varchar(20)	
)
begin
  case opt
    when  'insert' then
      IF EXISTS (SELECT * FROM absen_cuti WHERE no_cuti= vno_cuti)
      THEN
        select false success, msgvalue message FROM message where id=4;
      ELSE
        INSERT INTO absen_cuti
        (no_cuti, nik, kategori_cuti, keterangan, tgl_mulai, tgl_selesai, sisa_cuti, jml_cuti, sisakuota_cuti, create_date, create_by) 
        VALUES (vno_cuti,vnik,vkategori_cuti,vketerangan,vtgl_mulai,vtgl_selesai,vsisa_cuti,vjml_cuti,vsisakuota_cuti,vcreate_date,vcreate_by);
        
        IF row_count() > 0
        THEN
          select true success, msgvalue message FROM message where id=1;
        ELSE
          select false success, msgvalue message FROM message where id=2;
        END IF;
      END IF;
    when  'update' then
      IF EXISTS (SELECT * FROM absen_cuti WHERE no_cuti= vno_cuti )
            THEN
               UPDATE absen_cuti 
                SET                     
                  nik=vnik,
                  kategori_cuti=vkategori_cuti,
                  keterangan=vketerangan,
                  tgl_mulai=vtgl_mulai,
                  tgl_selesai=vtgl_selesai,
                  sisa_cuti=vsisa_cuti,
                  jml_cuti=vjml_cuti,
                  sisakuota_cuti=vsisakuota_cuti,
                  create_date=vcreate_date,
                  create_by=vcreate_by
                WHERE no_cuti=vno_cuti;


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
      IF EXISTS (SELECT * FROM absen_cuti WHERE no_cuti= vno_cuti )
            THEN
            delete from absen_cuti WHERE no_cuti= vno_cuti  ;
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
end;

DROP PROCEDURE IF EXISTS sp_tukaroff;
CREATE PROCEDURE `sp_tukaroff`(opt varchar(20),
vno_tukar	varchar(20)	,
vkode_jabatan	varchar(20)	,
vnik	varchar(10)	,
vtanggal	date	,
vhari	varchar(20)	,
vkode_shift	varchar(10)	,
vjam_kerja_1	time	,
vjam_kerja_2	time	,
vjam_kerja_3	time	,
vjam_kerja_4	time	,
vnik_tukar	varchar(10)	,
vtanggal_tukar	date	,
vhari_tukar	varchar(20)	,
vkode_shift_tukar	varchar(10)	,
vjam_kerja_1_tukar	time	,
vjam_kerja_2_tukar	time	,
vjam_kerja_3_tukar	time	,
vjam_kerja_4_tukar	time	,
vcreate_date	datetime	,
vcreate_by	varchar(20)	

)
begin
  case opt
    when  'insert' then
      IF EXISTS (SELECT * FROM tukaroff WHERE no_tukar= vno_tukar)
      THEN
        select false success, msgvalue message FROM message where id=4;
      ELSE
        INSERT INTO tukaroff
        (no_tukar, kode_jabatan, nik, tanggal, hari, kode_shift, jam_kerja_1, jam_kerja_2, jam_kerja_3, jam_kerja_4, nik_tukar, tanggal_tukar, hari_tukar, kode_shift_tukar, jam_kerja_1_tukar, jam_kerja_2_tukar, jam_kerja_3_tukar, jam_kerja_4_tukar, create_date, create_by) 
        VALUES (vno_tukar,vkode_jabatan,vnik,vtanggal,vhari,vkode_shift,vjam_kerja_1,vjam_kerja_2,vjam_kerja_3,vjam_kerja_4,vnik_tukar,vtanggal_tukar,vhari_tukar,vkode_shift_tukar,vjam_kerja_1_tukar,vjam_kerja_2_tukar,vjam_kerja_3_tukar,vjam_kerja_4_tukar,vcreate_date,vcreate_by);

        
        IF row_count() > 0
        THEN
          select true success, msgvalue message FROM message where id=1;
        ELSE
          select false success, msgvalue message FROM message where id=2;
        END IF;
      END IF;
    when  'update' then
      IF EXISTS (SELECT * FROM tukaroff WHERE no_tukar= vno_tukar )
            THEN
               UPDATE tukaroff 
                SET                
                  kode_jabatan=vkode_jabatan,
                  nik=vnik,
                  tanggal=vtanggal,
                  hari=vhari,
                  kode_shift=vkode_shift,
                  jam_kerja_1=vjam_kerja_1,
                  jam_kerja_2=vjam_kerja_2,
                  jam_kerja_3=vjam_kerja_3,
                  jam_kerja_4=vjam_kerja_4,
                  nik_tukar=vnik_tukar,
                  tanggal_tukar=vtanggal_tukar,
                  hari_tukar=vhari_tukar,
                  kode_shift_tukar=vkode_shift_tukar,
                  jam_kerja_1_tukar=vjam_kerja_1_tukar,
                  jam_kerja_2_tukar=vjam_kerja_2_tukar,
                  jam_kerja_3_tukar=vjam_kerja_3_tukar,
                  jam_kerja_4_tukar=vjam_kerja_4_tukar,
                  create_date=vcreate_date,
                  create_by=vcreate_by
                WHERE no_tukar=vno_tukar;


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
      IF EXISTS (SELECT * FROM tukaroff WHERE no_tukar= vno_tukar )
            THEN
            delete from tukaroff WHERE no_tukar= vno_tukar  ;
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
end;
