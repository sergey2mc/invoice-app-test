import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Invoice } from '../../core/interfaces/invoice.interface';
import { InvoiceService } from '../../core/services/invoice.service';


@Component({
	selector: 'app-invoice-view',
	templateUrl: './invoice-view.component.html',
	styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit {

	invoice$: Observable<Invoice>;

	constructor(
		private invoiceService: InvoiceService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.invoice$ = this.invoiceService.invoice$;
			// .do(i => console.log('RESULT INVOICE', i))
	}

	customerClickHandler() {
		this.router.navigate(['customers']);
	}
}
