import type { DbConnection } from '../../../generated';
import type { SubscriptionHandle } from './nonSpatialSubscriptions';
import { subscribeNonSpatialQueries } from './nonSpatialSubscriptions';

const UI_QUERIES = [
  'SELECT * FROM message',
  'SELECT * FROM player_pin',
  'SELECT * FROM active_connection',
  'SELECT * FROM matronage',
  'SELECT * FROM matronage_member',
  'SELECT * FROM matronage_invitation',
  'SELECT * FROM matronage_owed_shards',
  'SELECT * FROM beacon_drop_event',
];

export function subscribeUiQueries(connection: DbConnection): SubscriptionHandle[] {
  return subscribeNonSpatialQueries(
    connection,
    UI_QUERIES.map((query) => ({
      query,
      errorLabel: 'UI',
    }))
  );
}

