import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../core/services/github.service';
import { IP } from 'src/app/models/ip';

@Component({
  selector: 'app-my-ip',
  templateUrl: './my-ip.component.html',
  styleUrls: ['./my-ip.component.css']
})
export class MyIpComponent implements OnInit {
  myIp : IP
  constructor(private githubService: GithubService) { }

  async ngOnInit() {
    const response = await this.githubService.getPublicIp()
    this.myIp = IP.fromJson(response)
  }

}
