export class Formatter {
  public static dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  public static timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  public parseDate(dateString: string): { date: string; time: string } {
    const date = new Date(dateString);
    return {
      date: Formatter.dateFormatter.format(date),
      time: Formatter.timeFormatter.format(date)
    }
  }

  public parseNameToInitials(name: string) {
    const [firstName, lastName] = name.split(' ');
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
}

const formatter = new Formatter();

export default formatter;