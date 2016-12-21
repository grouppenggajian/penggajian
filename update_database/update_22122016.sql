drop view v_ijin;
drop view v_cuti;
drop table absen_cuti;
drop table absen_ijin;
CREATE TABLE `absen_cuti` (
  `no_cuti` varchar(20) DEFAULT NULL,
  `nik` varchar(10) DEFAULT NULL,
  `kategori_cuti` varchar(10) DEFAULT NULL,
  `keterangan` varchar(50) DEFAULT NULL,
  `tgl_mulai` date DEFAULT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `sisa_cuti` int(11) DEFAULT NULL,
  `jml_cuti` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `absen_ijin` (
  `no_ijin` varchar(20) DEFAULT NULL,
  `tgl_ijin` date DEFAULT NULL,
  `hari_ijin` varchar(20) DEFAULT NULL,
  `jam_ijin` time DEFAULT NULL,
  `nik` varchar(10) DEFAULT NULL,
  `kategori_ijin` varchar(10) DEFAULT NULL,
  `tipe_ijin` decimal(18,2) DEFAULT NULL,
  `keterangan` varchar(50) DEFAULT NULL,
  `jadwal` varchar(10) DEFAULT NULL,
  `jam_kerja_1` time DEFAULT NULL,
  `jam_kerja_2` time DEFAULT NULL,
  `jam_kerja_3` time DEFAULT NULL,
  `jam_kerja_4` time DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE VIEW `v_cuti` AS select `absen_cuti`.`no_cuti` AS `no_cuti`,`absen_cuti`.`nik` AS `nik`,`get_namajab_pegawai`('nama',`absen_cuti`.`nik`) AS `nama`,`get_namajab_pegawai`('jabatan',`absen_cuti`.`nik`) AS `jabatan`,`absen_cuti`.`kategori_cuti` AS `kategori_cuti`,`absen_cuti`.`keterangan` AS `keterangan`,`absen_cuti`.`tgl_mulai` AS `tgl_mulai`,`absen_cuti`.`tgl_selesai` AS `tgl_selesai`,`absen_cuti`.`create_date` AS `create_date`,`absen_cuti`.`create_by` AS `create_by` from `absen_cuti`;
CREATE VIEW `v_ijin` AS select `absen_ijin`.`no_ijin` AS `no_ijin`,`absen_ijin`.`tgl_ijin` AS `tgl_ijin`,`absen_ijin`.`hari_ijin` AS `hari_ijin`,`absen_ijin`.`jam_ijin` AS `jam_ijin`,`absen_ijin`.`nik` AS `nik`,`get_namajab_pegawai`('nama',`absen_ijin`.`nik`) AS `nama`,`get_namajab_pegawai`('jabatan',`absen_ijin`.`nik`) AS `jabatan`,`absen_ijin`.`kategori_ijin` AS `kategori_ijin`,`absen_ijin`.`tipe_ijin` AS `tipe_ijin`,`absen_ijin`.`keterangan` AS `keterangan`,`absen_ijin`.`jadwal` AS `jadwal`,`absen_ijin`.`jam_kerja_1` AS `jam_kerja_1`,`absen_ijin`.`jam_kerja_2` AS `jam_kerja_2`,`absen_ijin`.`jam_kerja_3` AS `jam_kerja_3`,`absen_ijin`.`jam_kerja_4` AS `jam_kerja_4`,`absen_ijin`.`create_date` AS `create_date`,`absen_ijin`.`create_by` AS `create_by` from `absen_ijin`;

truncate table sys_rolemenu;
insert into sys_rolemenu(role_id, idmenu) VALUES
('01', '1'), 
('01', '1a'), 
('01', '1b'), 
('01', '1c'), 
('01', '1d'), 
('01', '1e'), 
('01', '1f'), 
('01', '1f1'), 
('01', '1f2'), 
('01', '1f3'), 
('01', '1g'), 
('01', '1g1'), 
('01', '1g2'), 
('01', '1g3'), 
('01', '1g4'), 
('01', '1g5'), 
('01', '2'), 
('01', '2a'), 
('01', '2a1'), 
('01', '2a2'), 
('01', '2b'), 
('01', '2c'), 
('01', '2d'), 
('01', '2e'), 
('01', '2f'), 
('01', '2f1'), 
('01', '2f2'), 
('01', '2g'), 
('01', '2g1'), 
('01', '2g2'), 
('01', '2g3'), 
('01', '2h'), 
('01', '2h1'), 
('01', '2h2'), 
('01', '3'), 
('01', '3a'), 
('01', '3b'), 
('01', '3c'), 
('01', '3d'), 
('01', '4'), 
('01', '4a'), 
('01', '4b'), 
('02', '2'), 
('02', '2a'), 
('02', '2a2'), 
('02', '2f'), 
('02', '2f1'), 
('02', '2f2');