<?php

//	$payload = [      
//		"Userid" => "1",
//		"Nome" => "Julien",
//		"Email" => "julien@home.com"
//	];


function CreaJWT($fields = array() ) {

	$key = 'agewyt28!jhdjkh?sxh7';    //assolutamente Random

	$encoded_header = base64_encode('{"alg": "HS256","typ": "JWT"}');

	$encoded_payload = base64_encode(json_encode($fields));
	
	$header_payload = $encoded_header . '.' . $encoded_payload;

	// Generates a keyed hash value using the HMAC method
	$signature = hash_hmac('sha256',$header_payload, $key, true);

	//base64 encode the signature
	$signature = base64_encode($signature);

	//concatenating the header, the payload and the signature to obtain the JWT token
	$token = $header_payload.'.'.$signature;
	
	return $token;
	
}

function CheckJWT($token = NULL) {

	$key = 'agewyt28!jhdjkh?sxh7';    //assolutamente Random
 
	$jwt_values = explode('.', $token);
 
	$received_signature = $jwt_values[2];
 
	$receivedHeaderAndPayload = $jwt_values[0] . '.' . $jwt_values[1];
 
	$resultedsignature = base64_encode(hash_hmac('sha256', $receivedHeaderAndPayload, $key, true));
 
	if ($resultedsignature == $received_signature) return(true);
	else return(false);
 
}

function GetJWT($token = NULL) {
	
	$jwt_values = explode('.', $token);
	$received_payload = $jwt_values[1];
	$payload = base64_decode( $jwt_values[1] );
	
	return $payload;
	
}




?> 
