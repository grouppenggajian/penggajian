CREATE TABLE `rumus_thr_pendapatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `rumus_thr_masakerja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `masakerja` varchar(10) DEFAULT NULL COMMENT '<1/>1',
  `pembagi` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_rumus_thr_pendapatan` AS 
SELECT `a`.`id` AS `id`,
       `a`.`kode` AS `kode`,
       `b`.`keterangan` AS `keterangan`
  FROM (   `rumus_thr_pendapatan` `a`
        JOIN
           `pendapatans` `b`
        ON ((`a`.`kode` = `b`.`kode`)));
        
DROP PROCEDURE IF EXISTS gaji_db_new.sp_rumusthr_masakerja;
CREATE PROCEDURE gaji_db_new.`sp_rumusthr_masakerja`(opt           varchar(20),
                           vmasakerja	varchar(10),
vpembagi	varchar(20)
                           )
BEGIN
  CASE opt
         WHEN 'clear'
         THEN
            truncate table rumus_thr_masakerja;
         WHEN 'insert' THEN
            INSERT INTO rumus_thr_masakerja
            (masakerja,pembagi) 
            VALUES (vmasakerja,vpembagi);
            IF row_count() > 0 THEN
                select true success, msgvalue message FROM message where id=1;
            ELSE
                select false success, msgvalue message FROM message where id=2;
            END IF;
        WHEN 'delete' THEN
          if exists(select * from rumus_thr_masakerja where masakerja=vmasakerja) then
            delete from rumus_thr_masakerja where masakerja=vmasakerja;
            IF row_count() > 0 THEN
                select true success, msgvalue message FROM message where id=1;
            ELSE
                select false success, msgvalue message FROM message where id=2;
            END IF;
          else
            select false success, msgvalue message FROM message where id=3;
          end if;
        
  END CASE;         
END;

        DROP PROCEDURE IF EXISTS gaji_db_new.sp_rumusthr_pendapatan;
CREATE PROCEDURE gaji_db_new.`sp_rumusthr_pendapatan`(opt           varchar(20),
                           vkode      varchar(10)
                           )
BEGIN
  CASE opt
         WHEN 'clear'
         THEN
            truncate table rumus_thr_pendapatan;
         WHEN 'insert' THEN
            INSERT INTO rumus_thr_pendapatan
            (kode) 
            VALUES (vkode);
            IF row_count() > 0 THEN
                select true success, msgvalue message FROM message where id=1;
            ELSE
                select false success, msgvalue message FROM message where id=2;
            END IF;
        WHEN 'delete' THEN
          if exists(select * from rumus_thr_pendapatan where kode=vkode) then
            delete from rumus_thr_pendapatan where kode=vkode;
            IF row_count() > 0 THEN
                select true success, msgvalue message FROM message where id=1;
            ELSE
                select false success, msgvalue message FROM message where id=2;
            END IF;
          else
            select false success, msgvalue message FROM message where id=3;
          end if;
        
  END CASE;         
END;
