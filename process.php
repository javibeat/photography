<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = $_POST['nombre'];
  $email = $_POST['email'];
  $texto = $_POST['texto'];

  // Validar campos
  if (empty($nombre) || empty($email) || empty($texto)) {
    echo "Todos los campos son obligatorios.";
    exit;
  }

  // Dirección de correo a la que quieres enviar
  $to = 'javibeat@icloud.com';
  
  // Asunto del correo
  $subject = 'Nuevo mensaje desde tu sitio web';

  // Cuerpo del correo
  $message = "Nombre: " . $nombre . "\n";
  $message .= "Email: " . $email . "\n";
  $message .= "Texto: " . $texto;

  // Cabeceras adicionales para el correo
  $headers = 'From: ' . $email . "\r\n" .
             'Reply-To: ' . $email . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

  // Enviar el correo
  if (mail($to, $subject, $message, $headers)) {
    echo "Mensaje enviado correctamente.";
  } else {
    echo "Error al enviar el mensaje.";
  }
}
?>
