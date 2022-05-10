class Unit {
  #coefficientArmor; //Коэффициент поглощения. Урон = Урон * коэффициент

  constructor(id, name = 'Friend', health = 100, armor = 0) {
    this.id = id;
    this.name = name;
    this.maxHealth = health;
    this.currentHealth = health;
    this.percentHealth = 100;

    this.armor = armor > 90 ? 90 : armor;
    this.#coefficientArmor = 1 - this.armor / 100;

    this.isLife = true;
  }

  isDeath() {
    if (this.currentHealth > 0) {
      this.isLife = true;
      return false;
    } else {
      this.isLife = false;
      return true;
    }
  }

  takeDamage(damage) {
    this.currentHealth = this.currentHealth - damage * this.#coefficientArmor;
    this.percentHealth = (this.currentHealth / this.maxHealth) * 100;
    this.isDeath();
  }

  takeHeal(heal) {
    this.currentHealth += heal;
    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
    this.percentHealth = (this.currentHealth / this.maxHealth) * 100;
  }

  addArmor(armor) {
    this.armor += armor;
    if (this.armor > 90) this.armor = 90;
    this.#coefficientArmor = 1 - this.armor / 100;
  }
}

export default Unit;
