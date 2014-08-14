package com.idean.atthack.api;

import com.idean.atthack.api.ApiSpecRaw.ReqParam;

import android.text.TextUtils;

public class ApiSpec {
	private ApiSpecRaw mRaw;
	
	// Facade over composed ApiSpecRaw
	public String name;
	public String[] categories;
	public String id;
	public String description;
	public String docNumber;
	
	public String route() {
		if (mRaw.resourceTable != null) {
			return mRaw.resourceTable.route;
		}
		return null;
	}
	
	public HttpVerb verb() {
		if (mRaw.resourceTable != null
				&& mRaw.resourceTable.verbs != null
				&& mRaw.resourceTable.verbs.length > 0) {
			String verb = mRaw.resourceTable.verbs[0];
			try {
				// should be either POST or GET
				return HttpVerb.valueOf(verb);
			} catch (Exception e) {
				return null;
			}
		}
		return null;
	}
	
	public ReqParam[] requestParams() {
		if (mRaw.parameters != null
				&& mRaw.parameters.requestBody != null
				&& mRaw.parameters.requestBody.length > 0) {
			return mRaw.parameters.requestBody;
		}
		return null;
	}
	
	public enum HttpVerb {
		POST,
		GET
	}
	
	public ApiSpec(ApiSpecRaw raw) {
		mRaw = raw;
		name= mRaw.name;
		categories = mRaw.categories;
		id = mRaw.id;
		description = mRaw.description;
		docNumber = mRaw.docNumber;
	}
	
	public boolean isValid() {
		return !TextUtils.isEmpty(name) 
				&& !TextUtils.isEmpty(id) 
				&& !TextUtils.isEmpty(description) 
				&& !TextUtils.isEmpty(docNumber) 
				&& categories != null && categories.length > 0;
	}
}