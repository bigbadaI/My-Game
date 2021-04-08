import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import Test from '../assets/test.json';
import WorldTiles from '../assets/world_map_tiles.png';
import En from '../assets/8 v1.png';
import Man from '../assets/Male 12-3.png';


let Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,
  intialize:
  function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage;
  },
  attack: function(target) {
    target.takeDamage(this.damage);
  },
  takeDamage: function(damage) {
    this.hp -= damage;
  }
});

let Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
  function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
  }
});

let PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
  function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      
      this.setScale(2);
  }
});

let MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,
  
  initialize:
          
  function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
  },
  
  select: function() {
      this.setColor('#f8ff38');
  },
  
  deselect: function() {
      this.setColor('#ffffff');
  }
  
});


var Menu = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,
    
    initialize:
            
    function Menu(x, y, scene, heroes) {
        Phaser.GameObjects.Container.call(this, scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    },     
    addMenuItem: function(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);        
    },            
    moveSelectionUp: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    },
    // select the menu as a whole and an element with index from it
    select: function(index) {
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    },
    // deselect this menu
    deselect: function() {        
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    },
    confirm: function() {
        // wen the player confirms his slection, do the action
    }   
});

var HeroesMenu = new Phaser.Class({
    Extends: Menu,
    
    initialize:
            
    function HeroesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);                    
    }
});
 
var ActionsMenu = new Phaser.Class({
    Extends: Menu,
    
    initialize:
            
    function ActionsMenu(x, y, scene) {
        Menu.call(this, x, y, scene);   
        this.addMenuItem('Attack');
    },
    confirm: function() {
        // do something when the player selects an action
    }
    
});
 
var EnemiesMenu = new Phaser.Class({
    Extends: Menu,
    
    initialize:
            
    function EnemiesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);        
    },       
    confirm: function() {        
        // do something when the player selects an enemy
    }
});


export default class BattleScene extends Phaser.Scene
{
  constructor() {
    super({ key: 'BattleScene'})
  }
 preload() {
  this.load.image('enemy', En);
  this.load.spritesheet('man', Man, {
    frameWidth: 32
  });
 }
 create() {
  this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

  let warrior = new PlayerCharacter(this, 450, 50, 'man', 4, 'Warrior', 100, 200);
  this.add.existing(warrior);

  let enemy = new Enemy(this, 50, 50, 'enemy', null, 'Enemy', 50, 3);
  this.add.existing(enemy);

  this.heroes = [ warrior ]
  this.enemies = [ enemy ]
  this.units = this.heroes.concat(this.enemies)

  this.graphics = this.add.graphics();
  this.graphics.lineStyle(3, 0xffffff);
  this.graphics.fillStyle(0x031f4c, 1);        
  this.graphics.strokeRect(2, 198, 135, 100);
  this.graphics.fillRect(2, 198, 135, 100);
  this.graphics.strokeRect(140, 198, 135, 100);
  this.graphics.fillRect(140, 198, 135, 100);
  this.graphics.strokeRect(278, 198, 220, 100);
  this.graphics.fillRect(278, 198, 220, 100);

  // basic container to hold all menus
  this.menus = this.add.container();
                
  this.heroesMenu = new HeroesMenu(195, 153, this);           
  this.actionsMenu = new ActionsMenu(100, 153, this);            
  this.enemiesMenu = new EnemiesMenu(8, 153, this);   
  
  // the currently selected menu 
  this.currentMenu = this.actionsMenu;
  
  // add menus to the container
  this.menus.add(this.heroesMenu);
  this.menus.add(this.actionsMenu);
  this.menus.add(this.enemiesMenu);

 }
}