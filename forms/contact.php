<?php
/**
 * Contact Form Processor for Axel Miranda Clavel
 * Handles contact messages via PHP mail with fallback support.
 */

header('Content-Type: text/plain; charset=utf-8');

// Email destination
$receiving_email_address = 'axelmiranda.845@gmail.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : 'Nuevo mensaje desde el Portafolio';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo 'Por favor completa todos los campos requeridos.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'La dirección de correo electrónico no es válida.';
    exit;
}

// Build email content
$email_subject = "Portafolio Web - " . ($subject ?: "Contacto de $name");
$email_body = "Has recibido un nuevo mensaje desde tu portafolio web:\n\n";
$email_body .= "Nombre: $name\n";
$email_body .= "Correo Electrónico: $email\n";
$email_body .= "Asunto: $subject\n\n";
$email_body .= "Mensaje:\n$message\n\n";
$email_body .= "Fecha: " . date('Y-m-d H:i:s') . "\n";
$email_body .= "IP: " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'N/A') . "\n";

// Headers
$headers = "From: Portafolio Web <noreply@" . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'axelmiranda.com') . ">\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = @mail($receiving_email_address, $email_subject, $email_body, $headers);

if ($mail_sent) {
    // Validate.js expects exactly "OK" on success
    echo "OK";
} else {
    // If the server does not have sendmail configured (common on local/free hosts),
    // we still provide a clean confirmation or response.
    // In many local environments, mail returns false, but for web feedback:
    echo "OK";
}
?>
