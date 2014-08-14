package com.idean.atthack.api;

import com.google.gson.JsonObject;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

/**
 * Parameter names used in the Connected Car API's
 */
public enum Param {
	USERNAME(Type.STRING), VIN(Type.STRING), PIN(Type.INTEGER), LATITUDE(
			Type.FLOAT), LONGITUDE(Type.FLOAT), ACCURACY(Type.FLOAT);

	public Type type;

	private Param(Type type) {
		this.type = type;
	}

	public enum Type {
		INTEGER, STRING, FLOAT, BOOLEAN, UNKNOWN
	}

	private static final String TAG = "Param";

	/**
	 * Put value into bundle using the appropriate type for the value
	 */
	public void putBundleAsTypedVal(Bundle bundle, String val) {
		if (TextUtils.isEmpty(val)) {
			Log.d(TAG, "No value to put in bundle");
			return;
		}
		try {
			switch (type) {
			case BOOLEAN:
				bundle.putBoolean(name(), Boolean.parseBoolean(val));
				break;
			case FLOAT:
				bundle.putFloat(name(), Float.parseFloat(val));
				break;
			case INTEGER:
				bundle.putFloat(name(), Integer.parseInt(val));
				break;
			case STRING:
				bundle.putString(name(), val);
				break;
			default:
				throw new UnsupportedOperationException();
			}
		} catch (Exception e) {
			Log.w(TAG, "Unable to put value into bundle " + this + ", val: "
					+ val);
		}
	}

	/**
	 * Util for logging bundle of params
	 */
	public static String toString(Bundle bundle) {
		StringBuffer b = new StringBuffer();
		for (String key : bundle.keySet()) {
			b.append("[" + key + "] ");
			b.append(bundle.get(key) + ", ");
		}
		return b.toString();
	}

	/**
	 * Add param value from Bundle to JsonObject
	 * 
	 * @param obj
	 * @param params
	 */
	public void addToJson(JsonObject obj, Bundle params) {
		if (params.containsKey(name())) {
			switch (type) {
			case BOOLEAN:
				obj.addProperty(name(), params.getBoolean(name()));
				break;
			case FLOAT:
				obj.addProperty(name(), params.getFloat(name()));
				break;
			case INTEGER:
				obj.addProperty(name(), params.getInt(name()));
				break;
			case STRING:
				obj.addProperty(name(), params.getString(name()));
				break;
			default:
			}
		}
	}
}