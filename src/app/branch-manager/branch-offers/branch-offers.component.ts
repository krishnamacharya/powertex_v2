import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
@Component({
  selector: 'app-branch-offers',
  standalone: false,
  templateUrl: './branch-offers.component.html',
  styleUrls: ['./branch-offers.component.scss']
})
export class BranchOffersComponent implements OnInit {
  page:any=1
  branchoffersdata:any
  loginUserData:any
 
  constructor(private service: GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getbranchoffers()
  }
  userid:any
  getbranchoffers() {
    this.userid=this.loginUserData.user_id
   
    return this.service.getData1(this.userid,'offer/display/' ).subscribe((resp) => {
      this.branchoffersdata = resp
    })
  }

}
