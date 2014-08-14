package com.idean.atthack.api;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Specifies the name of the Connected Car API that this entity is associated with
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiName {
	public String value(); 
}
