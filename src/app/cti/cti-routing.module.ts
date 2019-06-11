import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CtiComponent } from './cti.component';
import { CtiEditorComponent } from './cti-editor/cti-editor.component';

const UsersRouting: Routes = [
  { path: 'cti', component: CtiComponent, canActivate: [AuthGuard] },
  { path: 'cti/edit/:id', component: CtiEditorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
      RouterModule.forChild(UsersRouting)
  ],
  declarations: [],
  exports: [
      RouterModule
  ],
})
export class CtiRoutingModule {}
