delete from sys_menu where idmenu='1f';
insert into sys_menu(idmenu, namemenu, parentmenu, icon_cls, isheader, active, formlocation, isexists) VALUES
('1f', 'Pengaturan', '1', NULL, true, true, NULL, false), 
('1f1', 'Periode Gaji', '1f', NULL, false, true, 'Penggajian.view.master.periode.Periode', true), 
('1f2', 'Hari Libur', '1f', NULL, false, true, 'Penggajian.view.master.pengaturan.HariLibur', true), 
('1f3', 'Ketentuan', '1f', NULL, false, true, 'Penggajian.view.master.pengaturan.Ketentuan', true);