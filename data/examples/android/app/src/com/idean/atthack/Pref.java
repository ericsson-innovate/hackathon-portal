package com.idean.atthack;

import android.content.Context;
import android.preference.PreferenceManager;

public enum Pref {

	USERNAME,
	PASSWORD,
	PIN,
	VIN;
	
	public boolean contains(Context context) {
		return PreferenceManager.getDefaultSharedPreferences(context).contains(name());
	}
	
	public String get(Context context) {
		return PreferenceManager.getDefaultSharedPreferences(context).getString(name(), null);
	}
	
	public void set(Context context, String val) {
		PreferenceManager.getDefaultSharedPreferences(context).edit().putString(name(), val).commit();
	}

	public static void clearAll(Context context) {
		PreferenceManager.getDefaultSharedPreferences(context).edit().clear().commit();
	}
}
