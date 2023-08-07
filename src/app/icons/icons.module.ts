import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Edit, X, Edit2 } from 'angular-feather/icons';

const icons = {
  Edit,
  X,
  Edit2
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }