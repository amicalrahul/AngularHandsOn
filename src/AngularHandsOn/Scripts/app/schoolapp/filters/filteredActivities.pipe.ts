import { Pipe, PipeTransform } from '@angular/core';
import { IActivity } from '../interfaces/activity';

@Pipe({ name: 'filteredActivities' })
export class FilteredActivities implements PipeTransform {
    transform(activities: IActivity[], filterMonth: number) {
        // if no filterMonth was provided, return all activities
        if (!filterMonth) {
            return activities;
        }

        let filteredActivities: IActivity[] = new Array<IActivity>();
        for (let activity of activities) {
            let activityMonth: number = new Date(activity.date).getMonth();

            // JavaScript month will be zero-based, so add 1 to it
            if ((activityMonth + 1) === filterMonth) {
                filteredActivities.push(activity);
            }
        }

        return filteredActivities;
    }
}
