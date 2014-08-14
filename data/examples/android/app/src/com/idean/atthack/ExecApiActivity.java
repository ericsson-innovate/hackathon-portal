package com.idean.atthack;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.idean.atthack.api.ApiSpec;
import com.idean.atthack.api.ApiSpecHelper;
import com.idean.atthack.api.ApiSpecRaw.ReqParam;
import com.idean.atthack.api.Param;
import com.idean.atthack.network.RequestHelper;
import com.idean.atthack.network.Result;

public class ExecApiActivity extends ActionBarActivity {

	private static final String TAG = "ExecApi";
	public static final String EXTRA_SPECID = "EXTRA_SPECID";
	private ProgressBar mProgress;
	private ApiSpec mSpec;
	private Map<Param, EditText> mParam2Field;
	private boolean mIsSending;
	private EditText mResponseBody;
	private TextView mResponseStatus;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		mParam2Field = new HashMap<Param, EditText>();
		
		setContentView(R.layout.apidetail);
		ApiSpec spec = getSpec(getIntent());
		if (spec == null) {
			Log.w(TAG,"Unable to determine api specfrom intent");
			Toast.makeText(this, R.string.no_api, Toast.LENGTH_SHORT).show();
			finish();
			return;
		}
		
		// bind name and description
		getSupportActionBar().setTitle(spec.name);
		setText(R.id.description, "[" + spec.docNumber + "] " + spec.description);
		
		// bind request params
		bindRequestParams(spec, mParam2Field);
		
		mProgress = (ProgressBar)findViewById(R.id.progress);
		mSpec = spec;
		mResponseBody = (EditText)findViewById(R.id.response_body);
		mResponseStatus = (TextView)findViewById(R.id.response_status);
	}


	private void bindRequestParams(ApiSpec spec, Map<Param, EditText> param2Field) {
		ReqParam[] params = spec.requestParams();
		if (params == null) {
			findViewById(R.id.request_empty).setVisibility(View.VISIBLE);
			return;
		}
		findViewById(R.id.request_empty).setVisibility(View.GONE);
		ViewGroup parent = (ViewGroup) findViewById(R.id.requestParent);
		for (ReqParam param: params) {
			View view = ParamHelper.SINGLETON.createParamWidget(this, param);
			ParamHelper.SINGLETON.addWidget(view, parent);

			// Map param key to the editText that contains the value of the parameter we're sending
			EditText edit = (EditText) view.findViewById(R.id.param_val);
			Param paramKey = param.key();
			if (edit != null && paramKey != null) {
				param2Field.put(paramKey, edit);	
			}
		}
	}


	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.exec_api, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_send) {
			new ExecApiTask().execute(null, null, null);
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	
	
	@Override
	public boolean onPrepareOptionsMenu(Menu menu) {
		MenuItem item = menu.findItem(R.id.action_send);
		if (item != null) {
			item.setEnabled(!mIsSending);
		}
		return super.onPrepareOptionsMenu(menu);
	}


	private void setText(int viewId, String text) {
		((TextView)findViewById(viewId)).setText(text);
	}

	private ApiSpec getSpec(Intent intent) {
		String specName = intent.getStringExtra(EXTRA_SPECID);
		if (specName == null) {
			return null;
		}
		return ApiSpecHelper.SINGLETON.getSpec(specName);
	}
	
	private class ExecApiTask extends AsyncTask<Void, Void, Result> {

		@Override
		protected void onPreExecute() {
			mProgress.setVisibility(View.VISIBLE);
			mIsSending = true;
			// Force #onPrepareOptions to be called
			supportInvalidateOptionsMenu();
			super.onPreExecute();
		}

		@Override
		protected void onPostExecute(Result result) {
			mProgress.setVisibility(View.INVISIBLE);
			mIsSending = false;
			supportInvalidateOptionsMenu();
			mResponseBody.setText(result.prettyJsonBody());
			mResponseStatus.setText(result.statusCode + " : " + result.message());
			super.onPostExecute(result);
		}

		@Override
		protected Result doInBackground(Void... params) {

			RequestHelper helper = new RequestHelper(ExecApiActivity.this);
			// Extract info from EditText UI fields
			Bundle bundle = new Bundle();
			Set<Entry<Param, EditText>> entries = mParam2Field.entrySet();
			for (Entry<Param,EditText> entry:entries) {
				if (entry.getKey() != null && entry.getValue() != null) {
					EditText edit = entry.getValue();
					String val = edit.getText().toString();
					Param param = entry.getKey();
					param.putBundleAsTypedVal(bundle, val);
				}
			}
			Log.d(TAG,"Executing " + mSpec.id + " using req params " + Param.toString(bundle));
			return ApiSpecHelper.SINGLETON.executeApi(mSpec, helper, bundle);
		}
		
	}
	
}
