//
//  LocalStorage.m
//  SearchGH
//
//  Created by Charles Lavery on 3/27/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "LocalStorage.h"

@implementation LocalStorage

- (void)set:(NSString *)name value:(NSString *)value
{
    RCT_EXPORT();
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    [defaults setObject:value forKey:name];
    
    [defaults synchronize];
}

- (void)get:(NSString *)name callback:(RCTResponseSenderBlock)callback
{
    RCT_EXPORT();
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    NSString *value = [defaults objectForKey:name];

    if(value) {
        callback(@[[NSNull null], value]);
    } else {
        callback(@[@"Not found", [NSNull null]]);
    }
}
@end
