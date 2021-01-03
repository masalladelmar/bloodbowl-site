export class PublicUrls {
  static readonly ADMIN = 'admin';
  static readonly NOT_FOUND = '**';

  static readonly RACES = 'races';
  static readonly RACES_DETAIL = PublicUrls.RACES + '/:race';
  static readonly COACHES = 'coaches';
  static readonly COACHES_DETAIL = PublicUrls.COACHES + '/:coach';
  static readonly TEAMS = 'teams';
  static readonly TEAMS_DETAIL = PublicUrls.TEAMS + '/:team';
  static readonly TEAMS_PRINT = PublicUrls.TEAMS_DETAIL + '/print';
  static readonly SKILLS = 'skills';
  static readonly SKILLS_TYPE = PublicUrls.SKILLS + '/:type';
  static readonly PHOTOS = 'photos';
  static readonly PHOTOS_DETAIL = PublicUrls.PHOTOS + '/:photo';
  static readonly POSTS_DETAIL = 'posts/:post';
  static readonly HALL_OF_FAME = 'hall-of-fame';
  static readonly HALL_OF_DEAD = 'hall-of-dead';
  static readonly LOGIN = 'login';
  static readonly TOURNAMENTS = 'tournaments';

  static readonly TOURNAMENTS_DETAIL = ':tournament';
  static readonly TOURNAMENTS_TEAMS = PublicUrls.TOURNAMENTS_DETAIL + '/teams';
  static readonly TOURNAMENTS_TEAMS_DEAIL = PublicUrls.TOURNAMENTS_TEAMS + '/:team';
  static readonly TOURNAMENTS_STATS = PublicUrls.TOURNAMENTS_DETAIL + '/stats';
  static readonly TOURNAMENTS_XP = PublicUrls.TOURNAMENTS_DETAIL + '/experience';
  static readonly TOURNAMENTS_RANKING = PublicUrls.TOURNAMENTS_DETAIL + '/ranking';
  static readonly TOURNAMENTS_JOURNEYS = PublicUrls.TOURNAMENTS_DETAIL + '/journeys';
  static readonly TOURNAMENTS_JOURNEYS_DETAIL = PublicUrls.TOURNAMENTS_JOURNEYS + '/:journey';
  static readonly TOURNAMENTS_MATCHES = PublicUrls.TOURNAMENTS_DETAIL + '/matches';
  static readonly TOURNAMENTS_MATCHES_DETAIL = PublicUrls.TOURNAMENTS_MATCHES + '/:match';
  static readonly TOURNAMENTS_PLAYOFFS = PublicUrls.TOURNAMENTS_DETAIL + '/playoffs';
  static readonly TOURNAMENTS_PLAYOFFS_DETAIL = PublicUrls.TOURNAMENTS_MATCHES + '/:match';
}
