package com.idean.atthack;

import java.util.List;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.idean.atthack.api.ApiSpec;
import com.idean.atthack.api.ApiSpecHelper;
import com.idean.atthack.api.ApiSpecHelper.ApiCategory;

public class ListApiActivity extends ActionBarActivity implements OnItemClickListener {

	private static final String TAG = "ListApi";
	public static final String EXTRA_CATEGORY = "EXTRA_CATEGORY";
	private ListView mListView; 

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_list_snips);

		ApiCategory category = getCategory(getIntent());
		if (category == null) {
			// default to something
			Log.w(TAG,"Unable to determine category from intent");
			category = ApiCategory.KNOW_CAR;
		}

		mListView = (ListView)findViewById(android.R.id.list);
		List<ApiSpec> specs = ApiSpecHelper.SINGLETON.getSpecs(category);
		mListView.setAdapter(new ApiSpecAdapter(this, specs ));
		mListView.setOnItemClickListener(this);
		
		if (specs.size() == 0) {
			mListView.setVisibility(View.GONE);
			findViewById(R.id.empty).setVisibility(View.VISIBLE);
		}

	}
	
	private ApiCategory getCategory(Intent intent) {
		String catStr = intent.getStringExtra(EXTRA_CATEGORY);
		if (catStr == null) {
			return null;
		}
		try {
			return ApiCategory.valueOf(catStr);
		} catch (Exception e) {
			return null;
		}
	}

	private class ApiSpecAdapter extends ArrayAdapter<ApiSpec> {
		private LayoutInflater mInflater;
		private int mDisabledColor;
		private int mEnabledColor;

		public ApiSpecAdapter(Context context, List<ApiSpec> specs) {
			super(context, -1, specs);
			mInflater = getLayoutInflater();
			mDisabledColor = context.getResources().getColor(android.R.color.darker_gray);
			mEnabledColor = context.getResources().getColor(android.R.color.black);
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			View view = mInflater.inflate(R.layout.two_line_list_item, null);
			ApiSpec spec = getItem(position);


			int color = mEnabledColor;
			if (!ApiSpecHelper.SINGLETON.isSupported(spec)) {
				view.setEnabled(false);
				color = mDisabledColor;
			}
			
			((TextView)view.findViewById(android.R.id.text1)).setText(spec.name);
			((TextView)view.findViewById(android.R.id.text1)).setTextColor(color);
			
			((TextView)view.findViewById(android.R.id.text2)).setText(spec.description);
			((TextView)view.findViewById(android.R.id.text2)).setTextColor(color);
			return view;
		}
	}


	@Override
	public void onItemClick(AdapterView<?> arg0, View arg1, int arg2, long arg3) {
		ApiSpec spec = (ApiSpec) arg0.getItemAtPosition(arg2);
		if (!ApiSpecHelper.SINGLETON.isSupported(spec)) {
			Toast.makeText(this, R.string.api_unsupported, Toast.LENGTH_SHORT).show();
			return;
		}
		
		Intent i = new Intent(this, ExecApiActivity.class);
		i.putExtra(ExecApiActivity.EXTRA_SPECID, spec.id);
		startActivity(i);
	}
}
