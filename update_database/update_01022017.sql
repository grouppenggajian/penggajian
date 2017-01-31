update sys_menu set formlocation='Penggajian.view.transaksi.hitunginsentifhadir.HitungInsentifHadir', isexists=1
where idmenu='2c3';
insert sys_menu(idmenu,namemenu,parentmenu,active,isexists) values('2c4','Hitung Denda Absensi','2c',1,0);

CREATE TABLE `absen_insentifhadir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nik` varchar(20) DEFAULT NULL,
  `thbl` int(11) DEFAULT NULL,
  `jadwal_masuk` int(11) DEFAULT '0',
  `jadwal_off` int(11) DEFAULT '0',
  `jumlah_absen` decimal(18,2) DEFAULT '0.00',
  `jumlah_ijin` decimal(18,2) DEFAULT '0.00',
  `kategori_ijin` varchar(200) DEFAULT NULL,
  `prosentase` decimal(18,2) DEFAULT '0.00',
  `nilai_insentif` decimal(18,2) DEFAULT '0.00',
  `insentif` decimal(18,2) DEFAULT '0.00',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

create view v_insentifhadir as
SELECT nik,
       `get_namajab_pegawai`('nama',`nik`) AS `nama`,
       `get_namajab_pegawai`('jabatan',`nik`) AS `jabatan`,
       thbl,
       jadwal_masuk,
       jadwal_off,
       jumlah_absen,
       jumlah_ijin,
       kategori_ijin,
       prosentase,
       nilai_insentif,
       insentif,
       update_date
  FROM absen_insentifhadir;

  
DROP PROCEDURE IF EXISTS gaji_db_new.sp_calc_insentifhadir;
CREATE PROCEDURE gaji_db_new.`sp_calc_insentifhadir`(vthbl int(6))
begin
  if exists(select * from absen_insentifhadir where thbl=vthbl) then
    delete from absen_insentifhadir where thbl=vthbl;
  end if;  
    INSERT INTO gaji_db_new.absen_insentifhadir
    (nik, thbl, jadwal_masuk, jadwal_off, jumlah_absen, jumlah_ijin, kategori_ijin, prosentase, nilai_insentif, insentif) 
    select a.nik,a.thbl,a.jmlmasuk as jadwal_masuk,a.jmloff jadwal_off,(b.jmlabsen-b.jmlabsenijin) as jumlah_absen,
    c.jmlijin jumlah_ijin,c.kategori_ijin kategori_ijin,if(a.jmlmasuk=b.jmlabsen,100,get_insentifpersen(c.kategori_ijin)) as prosentase 
    ,get_pendapatanpegawai(a.nik,get_kode_posting('pendapatan','INSENTIF HADIR')) as nilai_insentif,
    round(if(a.jmlmasuk=b.jmlabsen,100,get_insentifpersen(c.kategori_ijin))/100*get_pendapatanpegawai(a.nik,get_kode_posting('pendapatan','INSENTIF HADIR')),2) as insentif
    from
    ((select nik,vthbl as thbl, sum(if(kode_shift ='OFF',0,1)) jmlmasuk, sum(if(kode_shift ='OFF',1,0)) jmloff from mst_jadwal_karyawans
    where (tanggal between get_tgl_periodegaji('awal',vthbl) and  get_tgl_periodegaji('akhir',vthbl)) 
    group by nik ) as a 
    left join 
    (
    select nik,thbl, count(*) jmlabsen,sum(ifnull(get_tipeijin_ijin(nik,tgl),0)) jmlabsenijin from absen_temp
    where thbl=vthbl and kode_shift !='OFF'
    group by nik,thbl) as b
    on a.nik=b.nik and a.thbl=b.thbl )
    left join
    (select nik,vthbl thbl, sum(tipe_ijin) jmlijin,group_concat(concat(kategori_ijin,'=',tipe_ijin,'|H=',if(is_haripantangan(tgl_ijin,hari_ijin)=1,'2','1')))as kategori_ijin from absen_ijin
    where (tgl_ijin between get_tgl_periodegaji('awal',vthbl) and  get_tgl_periodegaji('akhir',vthbl))
    group by nik) as c
    on a.nik=c.nik and a.thbl=c.thbl;
    
    if row_count()>0 then
      select true success, msgvalue message FROM message where id=5;
    else
      select false success, 'Execute Finish' message;
    end if;
  
end;
  