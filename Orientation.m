//
//  Orientation.m
//  SearchGH
//
//  Created by Charles Lavery on 3/28/15.
//

#import "Orientation.h"

@implementation Orientation

@synthesize bridge = _bridge;

- (instancetype)init
{
    if ((self = [super init])) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceOrientationDidChange:) name:@"UIDeviceOrientationDidChangeNotification" object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)deviceOrientationDidChange:(NSNotification *)notification
{
    UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];

    NSString *orientationStr;
    switch (orientation) {
        case UIDeviceOrientationPortrait:
        case UIDeviceOrientationPortraitUpsideDown:
            orientationStr = @"PORTRAIT";
            break;
        case UIDeviceOrientationLandscapeLeft:
        case UIDeviceOrientationLandscapeRight:
            orientationStr = @"LANDSCAPE";
            break;
        default:
            orientationStr = @"UNKNOWN";
            break;
    }
    
    [_bridge.eventDispatcher sendDeviceEventWithName:@"orientationDidChange"
                                                body:@{@"orientation": orientationStr}];
}

@end
