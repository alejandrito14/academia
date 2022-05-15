CREATE PROCEDURE `versionactual` ()
BEGIN
SET @version=(SELECT versionapp from pagina_configuracion LIMIT 1 );
SET @actual=(SELECT COUNT(idcliente) as actual from clientes WHERE versionactual=@version);
SET @anterior=(SELECT COUNT(idcliente) as anterior from clientes WHERE versionactual!=@version or versionactual='' or versionactual IS NULL );
SELECT  @actual as actual, @anterior as anterior,@version as versionactual;

END
