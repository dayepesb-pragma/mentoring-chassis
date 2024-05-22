import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input({ required: false }) color: string = 'dark';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();


  onClickButton(): void {
    console.log('click')
    this.onClick.emit();
  }
}
