import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { ModalMessage } from '../core/interfaces/modal-message.interface';

/**
 * Opening Material Dialog Window with passed "data"
 * @param {MatDialog} dialog
 * @param {ModalMessage} data
 * @returns {MatDialogRef<ModalComponent>}
 */
export function openDialog(dialog: MatDialog, data: ModalMessage) {
	return dialog.open(ModalComponent, {
		width: '235px',
		data: data
	});
}