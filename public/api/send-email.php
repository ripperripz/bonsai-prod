<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
        exit;
    }

    $to = "amad@bonsai.sa";
    $subject = "New Contact Recognition - " . ($data['contact_objective'] ?? 'Inquiry');

    $firstName = stripslashes($data['firstName'] ?? '');
    $lastName = stripslashes($data['lastName'] ?? '');
    $email = stripslashes($data['email'] ?? '');
    $mobile = stripslashes($data['mobile'] ?? '');
    $contactObjective = $data['contact_objective'] ?? '';
    $unitType = $data['unit_type'] ?? 'N/A';
    $objective = $data['objective'] ?? 'N/A';
    $payment = $data['payment'] ?? 'N/A';
    $message = stripslashes($data['message'] ?? '');
    $language = $data['language'] ?? 'en';
    
    $timestamp = date("F j, Y, g:i a") . " (Riyadh Time)";

    // HTML Email Body
    $body = "
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #0F0E0D; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0F0E0D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #F7F5F2; padding: 30px; border: 1px solid #ddd; border-top: none; }
        .field { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .label { font-size: 11px; text-transform: uppercase; color: #C6A87C; font-weight: bold; }
        .value { font-size: 16px; margin-top: 5px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #C6A87C; margin-top: 10px; }
        .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class='header'>
        <h1 style='margin:0; font-size: 20px; letter-spacing: 2px;'>BONSAI RESIDENCES</h1>
      </div>
      <div class='content'>
        <div class='field'>
          <div class='label'>Contact Name</div>
          <div class='value'>$firstName $lastName</div>
        </div>
        <div class='field'>
          <div class='label'>Email</div>
          <div class='value'>$email</div>
        </div>
        <div class='field'>
          <div class='label'>Mobile</div>
          <div class='value'>+966 $mobile</div>
        </div>
        <div class='field'>
          <div class='label'>Objective</div>
          <div class='value'>$contactObjective</div>
        </div>";

    if ($contactObjective === 'Purchase Inquiry') {
        $body .= "
        <div class='field'>
          <div class='label'>Unit Type / Purchase Interest</div>
          <div class='value'>
            Type: $unitType <br>
            Purpose: $objective <br>
            Payment: $payment
          </div>
        </div>";
    }

    $body .= "
        <div class='field'>
          <div class='label'>Message</div>
          <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
        <div class='field' style='border:none;'>
          <div class='label'>Sent At</div>
          <div class='value' style='font-size:12px;'>$timestamp | Language: $language</div>
        </div>
      </div>
      <div class='footer'>
        Sent from bonsai.sa website contact form.
      </div>
    </body>
    </html>";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: webmaster@bonsai.sa" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send email"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
