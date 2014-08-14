package com.idean.atthack.api;

import android.text.TextUtils;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.idean.atthack.api.Param.Type;

/**
 * Contains the JSON data in exactly the schema that it's seen in JSON. Used
 * with {@link Gson} to deserialize info from a JSON file.
 * 
 * Composed by ApiSpec. Used to determine semantics around a particular API
 * spec.
 */
public class ApiSpecRaw {
	public String name;
	public String[] categories;
	public String id;
	public String description;
	public String docNumber;

	public ResourceTable resourceTable;
	public Parameters parameters;

	static class ResourceTable {
		@SerializedName("Route")
		String route;
		@SerializedName("HTTP Verb")
		String[] verbs;

	}

	static class Parameters {
		public ReqParam[] requestBody;
	}

	public static class ReqParam {
		private String key;
		private String type;
		public boolean required;
		public String description;

		public Param key() {
			if (TextUtils.isEmpty(key)) {
				return null;
			}
			try {
				return Param.valueOf(key.toUpperCase());
			} catch (Exception e) {
				return null;
			}
		}

		public Type type() {
			if (TextUtils.isEmpty(type)) {
				return Type.UNKNOWN;
			}
			try {
				if (type.equals("Integer")) {
					return Type.INTEGER;
				}
				if (type.equals("Double") || type.equals("Float")) {
					return Type.FLOAT;
				}
				if (type.equals("String")) {
					return Type.STRING;
				}
				if (type.equals("Boolean")) {
					return Type.BOOLEAN;
				}
			} catch (Exception e) {
				return Type.UNKNOWN;
			}
			return Type.UNKNOWN;
		}
	}

}
