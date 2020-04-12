class User {
  static Offline = 'offline';
  static DnD = 'dnd';
  static Available = 'available';

  constructor({ id = null, presence = null, profile = null, dndStatus = null }) {
    this._data = generateDataObejct();
    initialise(this, { id, presence, profile, dndStatus });
    return this;
  }

  setPresence = (presence) => (this._data.presence = JSON.parse(JSON.stringify(presence)));
  setProfile = (profile) => (this._data.profile = JSON.parse(JSON.stringify(profile)));
  setId = (id) => (this._data.id = id);
  setDndStatus = (dndStatus) => (this._data.dndStatus = JSON.parse(JSON.stringify(dndStatus)));

  get id() {
    return this._data.id;
  }
  get doNotDisturb() {
    return this._data.dndStatus && this._data.dndStatus.enabled;
  }
  get isOnline() {
    return this._data.presence && this._data.presence.active;
  }

  get name() {
    const { displayName, realName } = this._data.profile;
    return displayName || realName || this._data.pseudonym;
  }

  get title() {
    return this._data.profile.title || null;
  }

  get statusText() {
    const { status } = this._data.profile;
    return status ? status.text : null;
  }

  get statusEmoji() {
    const { status } = this._data.profile;
    return status ? status.emoji : null;
  }

  get images() {
    const { images } = this._data.profile || [];
    return images.map((image) => ({ ...image }));
  }

  get availability() {
    return !this.isOnline ? User.Offline : this.doNotDisturb ? User.DnD : User.Available;
  }

  clone() {
    return new User(this._data);
  }
}

export default User;

// ************** Private helpers **********
const pseudonyms = ['Secret Squirrel', 'A. Nonymous', 'Iva Fakename', "Sue D'Nim"];
const getPseudonym = () => pseudonyms[Math.floor(Math.random() * pseudonyms.length)];

const generateDataObejct = () => {
  return {
    presence: null,
    id: null,
    profile: null,
    dndStatus: null,
    pseudonym: getPseudonym(),
  };
};

const initialise = (instance, { id, presence, profile, dndStatus }) => {
  if (id) {
    instance.setId(id);
  }
  if (presence) {
    instance.setPresence(presence);
  }
  if (profile) {
    instance.setProfile(profile);
  }
  if (dndStatus) {
    instance.setDndStatus(dndStatus);
  }
};
