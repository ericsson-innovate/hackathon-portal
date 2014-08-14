package com.idean.atthack;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.idean.atthack.api.ApiSpecHelper.ApiCategory;

public class ListCategoriesActivity extends ActionBarActivity implements OnItemClickListener {

	private static final String TAG = "ListCat";
	private ListView mListView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_list_snips);
		
		mListView = (ListView)findViewById(android.R.id.list);
		mListView.setAdapter(new ApiCategoryAdapter(this));
		mListView.setOnItemClickListener(this);
		Log.d(TAG,"Got " + Pref.USERNAME.get(this) + ", " + Pref.VIN.get(this));
	}
 
	private class ApiCategoryAdapter extends ArrayAdapter<ApiCategory> {

		public ApiCategoryAdapter(Context context) {
			super(context, android.R.layout.simple_list_item_1, ApiCategory.values());
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			TextView view = (TextView)super.getView(position, convertView, parent);
			ApiCategory cat = getItem(position);
			view.setText(cat.displayName);
			return view;
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.list_snips, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_logout) {
			Pref.clearAll(this);
			Toast.makeText(this, R.string.logged_out, Toast.LENGTH_SHORT).show();
			finish();
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	@Override
	public void onItemClick(AdapterView<?> arg0, View arg1, int arg2, long arg3) {
		ApiCategory cat = (ApiCategory) arg0.getItemAtPosition(arg2);
		Intent i = new Intent(this, ListApiActivity.class);
		i.putExtra(ListApiActivity.EXTRA_CATEGORY, cat.name());
		startActivity(i);
	}
}
