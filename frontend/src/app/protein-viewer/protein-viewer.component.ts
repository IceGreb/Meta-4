import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-protein-viewer',
  templateUrl: './protein-viewer.component.html',
  styleUrls: ['./protein-viewer.component.scss']
})
export class ProteinViewerComponent implements AfterViewInit {
  @Input() moleculeId: string = '1cbs';  // Default value, can be overridden

  constructor() { }

  ngAfterViewInit(): void {
    const viewerInstance = new (window as any).PDBeMolstarPlugin();

    const options = {
      moleculeId: this.moleculeId
    };

    const viewerContainer = document.getElementById('molstar-viewer');
    if (viewerContainer) {
      viewerInstance.render(viewerContainer, options);
    }
  }
}
