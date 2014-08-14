package com.idean.atthack.network;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;

import com.google.gson.JsonObject;
import com.idean.atthack.Pref;
import com.idean.atthack.api.ApiName;
import com.idean.atthack.api.ApiSpec.HttpVerb;
import com.idean.atthack.api.Param;

/**
 * Mark API's that are supported with {@link ApiName} annotation. The app will
 * automatically show that the annotated API is supported and attempt to execute
 * the API with the corresponding method.
 * <p>
 * All API methods should have the signature
 * <code>Result fooBar(Bundle params)</code>
 */
public class RequestHelper {
	//private final static String BASE = "http://asdp-emulator-env-rtfnw3u24d.elasticbeanstalk.com/";
	private final static String BASE = "http://lightning.att.io:3000/";
	private static final String TAG = "ReqHlp";
	private Context mContext;

	public RequestHelper(Context context) {
		mContext = context;
		if (!Pref.VIN.contains(mContext) || !Pref.USERNAME.contains(mContext)
				|| !Pref.PASSWORD.contains(mContext)) {
			Log.w(TAG, "Missing required preference values: vin, pin, username");
		}
		
		Log.d(TAG,"Found username " + Pref.USERNAME.get(context)
				 + "Pin " + Pref.PIN.get(context));

	}

	// ## START 2.6.4-login
	@ApiName("2.6.4-login")
	public Result login(Bundle params) {
		String username = params.getString(Param.USERNAME.name());
		String vin = params.getString(Param.VIN.name());
		String pin = params.getString(Param.PIN.name());
		if (username == null || vin == null || pin == null) {
			return new Result(400);
		}

		HttpURLConnection conn = null;
		try {
			URL url = new URL(BASE + "remoteservices/v1/vehicle/login/" + vin);

			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(HttpVerb.POST.name());
			String auth = username + ":" + pin;
			String encoded = Base64.encodeToString(auth.getBytes(),
					Base64.DEFAULT);
			conn.setRequestProperty("Authorization", "Basic " + encoded);

			conn.connect();
			// Closes input stream afterwards
			String body = readStream(conn.getInputStream());
			return new Result(conn.getResponseCode(), body);

		} catch (IOException e) {
			Log.w(TAG, "Unable to login " + e.getMessage(), e);
			return new Result("Unable to login: " + e.getMessage());
		} finally {
			if (conn != null) {
				conn.disconnect();
			}
		}
	}
	// ## END 2.6.4-login

	// ## START 2.6.1-sign-up
	// ## START 2.6.2-validate-otp
	// ## START 2.6.3-set-pin
	// ## START 2.6.5-door-unlock
	@ApiName("2.6.5-door-unlock")
	public Result unlockDoor(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/unlock/" + Pref.VIN.get(mContext);
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.1-sign-up
	// ## END 2.6.2-validate-otp
	// ## END 2.6.3-set-pin
	// ## END 2.6.5-door-unlock

	// ## START 2.6.6-door-lock
	@ApiName("2.6.6-door-lock")
	 public Result lockDoor(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/lock/" + Pref.VIN.get(mContext);
		
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.6-door-lock

	// ## START 2.6.7-engine-on
	@ApiName("2.6.7-engine-on")
	public Result engineOn(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/engineOn/" + Pref.VIN.get(mContext);
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.7-engine-on
	
	// ## START 2.6.8-engine-off
 	@ApiName("2.6.8-engine-off")
	public Result engineOff(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/engineOff/" + Pref.VIN.get(mContext);
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.8-engine-off
 	
	
	// ## START 2.6.9-honk-and-blink
	@ApiName("2.6.9-honk-and-blink")
	public Result honkAndBlink(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/honkBlink/" + Pref.VIN.get(mContext);
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.9-honk-and-blink

	// ## START 2.6.10-check-request-status
	// ## START 2.6.11-view-diagnostic-data	
	@ApiName("2.6.11-view-diagnostic-data")
	public Result getDiagnosticData(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/diagnostics/view/" + Pref.VIN.get(mContext);
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.10-check-request-status
	// ## END 2.6.11-view-diagnostic-data
	
	// ## START 2.6.12-get-vehicle-status	
	@ApiName("2.6.12-get-vehicle-status")
	public Result getVehicleStatus(Bundle params) {
		JsonObject obj = new JsonObject();
		Param.LATITUDE.addToJson(obj, params);
		Param.LONGITUDE.addToJson(obj, params);
		Param.ACCURACY.addToJson(obj, params);
		String urlStr = BASE + "remoteservices/v1/vehicle/status/view/" + Pref.VIN.get(mContext);
		
		return sendHttpPost(obj, urlStr);
	}
	// ## END 2.6.12-get-vehicle-status

	
	// ## START COMMON
	/**
	 * Send secured HTTP Post to argument URL.  Secured with basic http authentication
	 */
	private Result sendHttpPost(JsonObject obj, String urlStr) {
		HttpURLConnection conn = null;
		try {
			URL url = new URL(urlStr);
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(HttpVerb.POST.name());
			setBasicAuth(conn);
			conn.setDoOutput(true);
			writeBody(conn, obj);
			conn.connect();
			Log.d(TAG,"[" + conn.getRequestMethod() + "] to " + url.toString());

			String body = readStream(conn.getInputStream());
			return new Result(conn.getResponseCode(), body);
		} catch (IOException e) {
			return new Result(e.getClass() + ": " + e.getMessage());
		} finally {
			if (conn != null) {
				conn.disconnect();
			}
		}
	}


	private void writeBody(HttpURLConnection urlConnection, JsonObject obj) {
		try {
			String body = obj.toString();
			if (obj.entrySet().size() == 0 || TextUtils.isEmpty(body)) {
				return;
			}
			urlConnection.setRequestProperty("Content-Type", "application/json");

			PrintWriter writer = new PrintWriter(new BufferedOutputStream(
					urlConnection.getOutputStream()));
			writer.print(body); // presumably in UTF-8
			Log.d(TAG, "Wrote request body " + body);
		} catch (Exception e) {
			Log.w(TAG, "Unable to send request body", e);
		}
	}

	private void setBasicAuth(HttpURLConnection conn) {
		String auth = Pref.USERNAME.get(mContext) + ":"
				+ Pref.PIN.get(mContext);
		String encoded = Base64.encodeToString(auth.getBytes(), Base64.DEFAULT);
		conn.setRequestProperty("Authorization", "Basic " + encoded);
	}

	public static String readStream(InputStream in) {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(in));
			StringBuffer b = new StringBuffer();
			String line = null;
			while ((line = reader.readLine()) != null) {
				b.append(line);
			}
			return b.toString();
		} catch (Exception e) {
			Log.w(TAG, "Unable to read stream", e);
			return null;
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
				}
			}
		}
	}
	// END COMMON

}
