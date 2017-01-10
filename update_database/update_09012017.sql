create view v_periodegaji_aktif as
SELECT periode_gaji.id,
       periode_gaji.tglawal,
       periode_gaji.tglakhir,
       periode_gaji.thbl,
       periode_gaji.aktif
  FROM periode_gaji periode_gaji
  where periode_gaji.aktif is true;

CREATE TABLE `ref_hari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `days` varchar(20) DEFAULT NULL,
  `hari` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

insert into ref_hari (days, hari) VALUES
('Sunday', 'Minggu'), 
( 'Monday', 'Senin'), 
('Tuesday', 'Selasa'), 
('Wednesdayday', 'Rabu'), 
('Thusday', 'Kamis'), 
('Friday', 'Jum''at'), 
('Saturday', 'Sabtu');

  DROP FUNCTION IF EXISTS get_dayname;
CREATE FUNCTION `get_dayname`(vday varchar(20)) RETURNS varchar(20) CHARSET latin1
BEGIN
  declare retval varchar(20);
  select hari into retval from ref_hari where days=vday;
	
	RETURN retval;
END;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_logabsen` AS select `log_absen`.`id` AS `id`,`log_absen`.`pin` AS `pin`,`get_ref_pegawai_bypin`('nik',`log_absen`.`pin`) AS `nik`,`get_ref_pegawai_bypin`('nama',`log_absen`.`pin`) AS `nama`,`get_ref_pegawai_bypin`('jabatan',`log_absen`.`pin`) AS `nama_jabatan`,cast(`log_absen`.`date_time` as date) AS `tanggal`,`get_dayname`(dayname(`log_absen`.`date_time`)) AS `hari`,cast(`log_absen`.`date_time` as time) AS `jam`,`log_absen`.`date_time` AS `date_time`,`log_absen`.`verified` AS `verified`,`log_absen`.`status` AS `status`,`get_statusmesin`(`log_absen`.`status`) AS `status_absen` from `log_absen`;  

ALTER TABLE mst_karyawans
ADD `pin` int(11) DEFAULT NULL AFTER nik,
ADD `post_finger` tinyint(1) DEFAULT '0' AFTER pin;

ALTER TABLE ketentuan
ADD `mulaiabsen` int(11) DEFAULT NULL AFTER periodeselesai,
ADD  `ipmesin` varchar(15) DEFAULT NULL AFTER mulaiabsen,
ADD  `pwdmesin` varchar(20) DEFAULT NULL AFTER ipmesin;
  
DROP PROCEDURE IF EXISTS sp_pegawai;
CREATE PROCEDURE `sp_pegawai`(
opt varchar(10),
vnik	varchar(20)	,
vnama	varchar(40)	,
vnama_panggilan	varchar(20)	,
vtgl_masuk	date	,
vjabatan	varchar(10)	,
vstatus_kerja	varchar(45)	,
vno_ktp	varchar(45)	,
vtgl_ktp	date	,
valamat	varchar(50)	,
vpropinsi	varchar(20)	,
vkabupaten	varchar(20)	,
vkecamatan	varchar(20)	,
vkelurahan	varchar(45)	,
vtelp	varchar(45)	,
vhp	varchar(45)	,
vtempat_lahir	varchar(45)	,
vtgl_lahir	date	,
vjns_kelamin	varchar(5)	,
vgol_darah	varchar(5)	,
vagama	varchar(20)	,
vpendidikan	varchar(20)	,
vstatus_kawin	varchar(45)	,
vstatus_pajak	varchar(5)	,
vlibur_perminggu	varchar(45)	,
vstatus_pegawai	varchar(45)	,
vtgl_keluar	date	,
vphoto	varchar(255)	,
vcreate_by	varchar(20)	
)
BEGIN
	case opt
    when 'insert' then
      IF EXISTS (SELECT * FROM mst_karyawans WHERE nik = vnik) THEN
        select false success, msgvalue message FROM message where id=4;
      ELSE
        INSERT INTO mst_karyawans
        (nik, pin,nama, nama_panggilan, tgl_masuk, jabatan, status_kerja, no_ktp, tgl_ktp, alamat, propinsi, kabupaten, kecamatan, kelurahan, telp, hp, tempat_lahir, tgl_lahir, jns_kelamin, gol_darah, agama, pendidikan, status_kawin, status_pajak, libur_perminggu, status_pegawai, tgl_keluar, photo, create_date, create_by) 
        VALUES (vnik,genidmaster('PIN',0,0),	vnama,	vnama_panggilan,	vtgl_masuk,	vjabatan,	vstatus_kerja,	vno_ktp,	vtgl_ktp,	valamat,	vpropinsi,	vkabupaten,	vkecamatan,	vkelurahan,	vtelp,	vhp,	vtempat_lahir,	vtgl_lahir,	vjns_kelamin,	vgol_darah,	vagama,	vpendidikan,	vstatus_kawin,	vstatus_pajak,	vlibur_perminggu,	vstatus_pegawai,	vtgl_keluar,	vphoto,	now(),	vcreate_by);        
        IF row_count() > 0 THEN
          select true success, msgvalue message FROM message where id=1;
        ELSE
          select false success, msgvalue message FROM message where id=2;
        END IF;
      END IF;
    when 'update' then
        IF EXISTS (SELECT * FROM mst_karyawans WHERE nik = vnik) THEN
          UPDATE mst_karyawans 
          SET  nama=vnama,	nama_panggilan=vnama_panggilan,	tgl_masuk=vtgl_masuk,	jabatan=vjabatan,	status_kerja=vstatus_kerja,	no_ktp=vno_ktp,	tgl_ktp=vtgl_ktp,	alamat=valamat,	propinsi=vpropinsi,	kabupaten=vkabupaten,	kecamatan=vkecamatan,	kelurahan=vkelurahan,	telp=vtelp,	hp=vhp,	tempat_lahir=vtempat_lahir,	tgl_lahir=vtgl_lahir,	jns_kelamin=vjns_kelamin,	gol_darah=vgol_darah,	agama=vagama,	pendidikan=vpendidikan,	status_kawin=vstatus_kawin,	status_pajak=vstatus_pajak,	libur_perminggu=vlibur_perminggu,	status_pegawai=vstatus_pegawai,	tgl_keluar=vtgl_keluar,	photo=vphoto,	update_date=now(),	update_by=vcreate_by
          WHERE nik = vnik;
          
          IF row_count() > 0 THEN
            select true success, msgvalue message FROM message where id=1;
          ELSE
            select false success, msgvalue message FROM message where id=2;
          END IF;
        ELSE
          select false success, msgvalue message FROM message where id=3;
        END IF;
  end case;
END;
