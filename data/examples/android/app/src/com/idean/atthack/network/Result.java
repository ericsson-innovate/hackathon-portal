package com.idean.atthack.network;

import org.json.JSONObject;

import android.text.TextUtils;
import android.util.Log;

public class Result {
	private static final String TAG = "Result";
	public int statusCode;
	private String message;
	public String body;
	
	public String message() {
		if (!TextUtils.isEmpty(message)) {
			return message;
		}
		if (statusCode != 200) {
			return "API request failed";
		} else {
			return "API request succeeded";
		}
	}
	
	/**
	 * Attempt to show as pretty JSON
	 */
	public String prettyJsonBody() {
		JSONObject o;
		try {
			o = new JSONObject(body);
			return o.toString(3);
		} catch (Exception e) {
			Log.w(TAG,"Unable to jsonify body " + body);
			return body;
		}
	}
	
	public Result(int responseCode) {
		statusCode = responseCode;
	}
	
	public Result(String message) {
		this.message = message;
	}
	public Result(int responseCode, String body) {
		this.statusCode = responseCode;
		this.body = body;
	}

	public boolean isSuccess() {
		return statusCode >= 200 && statusCode < 300;
	}
}