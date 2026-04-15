<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Log for debugging (check error_log in cPanel)
    error_log("Contact Form Data: " . $json);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
        exit;
    }

    // Extract form data - handle both camelCase and snake_case
    $firstName = htmlspecialchars($data['firstName'] ?? '');
    $lastName = htmlspecialchars($data['lastName'] ?? '');
    $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $mobile = htmlspecialchars($data['mobile'] ?? '');
    $contactObjective = $data['contactObjective'] ?? $data['contact_objective'] ?? 'Inquiry';
    $unitType = $data['unitType'] ?? $data['unit_type'] ?? 'N/A';
    $objective = $data['objective'] ?? 'N/A';
    $payment = $data['payment'] ?? 'N/A';
    $message = htmlspecialchars($data['message'] ?? '');
    $language = $data['language'] ?? 'en';

    // Validate required fields
    if (empty($firstName) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    // Email configuration - SAME AS TEST FILE THAT WORKED
    $to = "amad@bonsai.sa";
    $subject = "New Contact Form - Bonsai Website";
    
    // Simple plain text version first (since test worked with plain text)
    $body = "New Contact Form Submission\n";
    $body .= "===========================\n\n";
    $body .= "Name: $firstName $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Mobile: +966 $mobile\n";
    $body .= "Objective: $contactObjective\n";
    
    if ($contactObjective === 'purchase') {
        $body .= "Unit Type: $unitType\n";
        $body .= "Purpose: $objective\n";
        $body .= "Payment: $payment\n";
    }
    
    $body .= "\nMessage:\n$message\n";
    $body .= "\n===========================\n";
    $body .= "Sent from bonsai.sa contact form\n";
    $body .= "Language: $language\n";
    $body .= "Time: " . date("Y-m-d H:i:s") . "\n";

    // Simple headers - SAME FORMAT AS TEST FILE THAT WORKED
    $headers = "From: amad@bonsai.sa\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    $mailSent = mail($to, $subject, $body, $headers);
    
    // Log result
    error_log("Mail sent result: " . ($mailSent ? "success" : "failed"));

    if ($mailSent) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } else {
        http_response_code(500);
        $error = error_get_last();
        error_log("Mail error: " . print_r($error, true));
        echo json_encode(["status" => "error", "message" => "Failed to send email"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
