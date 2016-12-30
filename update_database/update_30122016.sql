CREATE TABLE `rumus_thr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode` varchar(10) DEFAULT NULL,
  `komponen` varchar(20) DEFAULT NULL,
  `rowset` int(11) DEFAULT NULL,
  `column_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_kode_rmsthr` (`kode`),
  KEY `idx_komponen_rmsthr` (`komponen`),
  KEY `idx_rowseat_rmsthr` (`rowset`),
  KEY `idx_colname_rmsthr` (`column_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP FUNCTION IF EXISTS gaji_db.get_colrumusthr;
CREATE FUNCTION gaji_db.`get_colrumusthr`(vkode varchar(15),vcolumn_name varchar(10)) RETURNS varchar(15) CHARSET latin1
begin
  declare retval varchar(15);
  set retval=null;
  if exists(select * from rumus_pendapatans where kode=vkode and column_name=vcolumn_name) then
    select ifnull(komponen,kode) into retval from rumus_thr where kode=vkode and column_name=vcolumn_name;
  end if;
  return retval;
end;


DROP PROCEDURE IF EXISTS gaji_db.sp_rumusthr;
CREATE PROCEDURE gaji_db.`sp_rumusthr`(opt           varchar(20),
                           vkode      varchar(10),
                           vkomponen    varchar(45),
                           vrowset	int(11),
vcolumn_name	varchar(20)
                           )
BEGIN
  CASE opt
         WHEN 'clear'
         THEN
            truncate table rumus_thr;
         WHEN 'insert' THEN
            INSERT INTO rumus_thr
            (kode, komponen, rowset, column_name) 
            VALUES (vkode, vkomponen, vrowset, vcolumn_name);

         
  END CASE;         
END;

DROP PROCEDURE IF EXISTS gaji_db.sp_rumus_thr_load;
CREATE PROCEDURE gaji_db.`sp_rumus_thr_load`()
BEGIN

  SELECT
  GROUP_CONCAT(DISTINCT 
    CONCAT(
      'get_colrumusthr(kode,''',column_name,''') as ',
      column_name
    )
  ) into @sqlw
FROM
  rumus_thr 
  ;
  
set  @query= CONCAT('SELECT ',@sqlw,' FROM rumus_thr group by kode;');
  
  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

END;
