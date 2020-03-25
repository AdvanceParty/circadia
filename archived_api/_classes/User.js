class User {
  constructor(data) {
    // prevent getter methods throwing an error
    // if called before any data is set
    this[_data] = { profile: null };

    Object.defineProperty(this, 'id', {
      enumerable: true,
      get: () => this[_data].id
    });
    Object.defineProperty(this, 'teamId', {
      enumerable: true,
      get: () => this[_data].team_id
    });
    Object.defineProperty(this, 'tzOffset', {
      enumerable: true,
      get: () => this[_data].tz_offset
    });
    Object.defineProperty(this, 'displayName', {
      enumerable: true,
      get: () => this[_data].profile.display_name
    });
    Object.defineProperty(this, 'statusText', {
      enumerable: true,
      get: () => this[_data].profile.status_text
    });
    Object.defineProperty(this, 'statusEmoji', {
      enumerable: true,
      get: () => this[_data].profile.status_emoji
    });
    Object.defineProperty(this, 'isBot', {
      enumerable: true,
      get: () => this[_data].is_bot
    });
    Object.defineProperty(this, 'title', {
      enumerable: true,
      get: () => this[_data].profile.title
    });
    Object.defineProperty(this, 'fields', {
      enumerable: true,
      get: () => JSON.parse(JSON.stringify(this[_data].profile.fields))
    });
    Object.defineProperty(this, 'image', {
      enumerable: true,
      get: () => this[_data].profile.image_32
    });
    Object.defineProperty(this, _data, {
      enumerable: false
    });
    Object.defineProperty(this, 'data', {
      enumerable: true,
      get: () => JSON.parse(JSON.stringify(this[_data])),
      set: data => {
        if (userDataIsValid(data)) {
          this[_data] = JSON.parse(JSON.stringify(data));
        } else {
          throw new Error(
            'Unexpected data format. Expected a full {user} object as documented in the Slack API.'
          );
        }
      }
    });

    if (data) this.data = data;
  }
}

export default User;

// private class properties
const _data = Symbol('data');
const userDataIsValid = data => {
  const required = {
    root: ['id', 'team_id', 'tz_offset', 'is_bot'],
    profile: [
      'display_name',
      'status_emoji',
      'status_text',
      'title',
      'fields',
      'image_32'
    ]
  };

  return (
    required.root.every(key => Object.keys(data).includes(key)) &&
    required.profile.every(key => Object.keys(data.profile).includes(key))
  );
};
