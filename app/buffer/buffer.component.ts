import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    var myVar;
    myVar = setTimeout(() => {
      alert("Payment Done!");
      this.router.navigate(['']);
    }, 1100);
    
    //this.router.navigate(['/notify']);

  }
}