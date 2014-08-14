package com.idean.atthack;

import android.app.Service;
import android.content.Context;
import android.text.InputFilter;
import android.text.InputType;
import android.text.method.DigitsKeyListener;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.idean.atthack.api.ApiSpecRaw.ReqParam;

public enum ParamHelper {
	SINGLETON;

	public View createParamWidget(Context context, ReqParam param) {
		LayoutInflater inf = (LayoutInflater) context
				.getSystemService(Service.LAYOUT_INFLATER_SERVICE);
		View v = inf.inflate(R.layout.request_param, null);
		((TextView) v.findViewById(R.id.param_name))
				.setText(param.key().name());
		((TextView) v.findViewById(R.id.param_description))
				.setText(param.description + " (" + param.type() + ")");

		v.findViewById(R.id.param_required).setVisibility(
				param.required ? View.VISIBLE : View.GONE);

		EditText edit = (EditText) v.findViewById(R.id.param_val);
		switch (param.type()) {
		case STRING:
			edit.setRawInputType(InputType.TYPE_CLASS_TEXT);
			break;
		case INTEGER:
			edit.setRawInputType(InputType.TYPE_CLASS_NUMBER);
			edit.setFilters(new InputFilter[] { new DigitsKeyListener() });
			break;
		case FLOAT:
			edit.setRawInputType(InputType.TYPE_CLASS_NUMBER
					| InputType.TYPE_NUMBER_FLAG_DECIMAL);
			break;
		case BOOLEAN:
			break;
		default:
			break;
		}
		return v;
	}

	private static final LinearLayout.LayoutParams sLayout = new LinearLayout.LayoutParams(
			LinearLayout.LayoutParams.WRAP_CONTENT,
			LinearLayout.LayoutParams.WRAP_CONTENT);

	public void addWidget(View view, ViewGroup parent) {
		parent.addView(view, sLayout);
	}

}
