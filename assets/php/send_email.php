<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    // Validate form data (basic validation example)
    if (!empty($fullname) && !empty($email) && !empty($message)) {
        // Set recipient email address
        $to = 'your-email@example.com'; // Replace with your email address

        // Set email subject and message body
        $subject = 'New Contact Form Submission';
        $body = "Name: $fullname\n\nEmail: $email\n\nMessage:\n$message";

        // Headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo 'Message sent successfully. We will contact you shortly.';
        } else {
            echo 'Failed to send message. Please try again later.';
        }
    } else {
        echo 'Please fill out all required fields.';
    }
} else {
    echo 'Method not allowed.';
}
?>
